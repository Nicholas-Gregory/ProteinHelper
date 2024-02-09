require('dotenv').config();
const Food = require('./models/Food.js');
const data = require('./food_data.json').SRLegacyFoods;
const mongoose = require('mongoose');
const excelToJson = require('convert-excel-to-json');

let db;

const NUTRIENTS = [
    'Histidine',
    'Isoleucine',
    'Leucine',
    'Lysine',
    'Methionine',
    'Phenylalanine',
    'Threonine',
    'Tryptophan',
    'Valine',
    'Protein',
    'Calcium, Ca',
    'Iron, Fe',
    'Zinc, Zn',
    'Vitamin B-12',
    'Vitamin B-12, added',
    'Vitamin D (D2 + D3)',
    'PUFA 18:3 n-3 c,c,c (ALA)',
    'PUFA 22:6 n-3 (DHA)',
    'PUFA 20:5 n-3 (EPA)'
];

const iodineData = excelToJson({
    sourceFile: 'iodine_data.xlsx',
    columnToKey: {
        B: 'ndb',
        D: 'name',
        F: 'amount'
    }
}).Sheet1;

mongoose.connect(process.env.DB_CONN_URL)
.then(async connection => {
    db = connection;

    await createData();

    db.disconnect();
});

async function createData() {
    for (let item of data) {
        if (item.foodNutrients.some(nutrient => NUTRIENTS.includes(nutrient.nutrient.name))) {
            let result = await Food.create({
                name: item.description,
                nutrients: item.foodNutrients
                .filter(nutrient => NUTRIENTS
                    .includes(nutrient.nutrient.name))
                .map(nutrient => ({
                    name: nutrient.nutrient.name,
                    unit: nutrient.nutrient.unitName,
                    amount: nutrient.amount
                }))
            });

            const iodineItem = iodineData.find(iodineFood => Number(iodineFood.ndb) === Number(item.ndbNumber));
            if (iodineItem && !isNaN(iodineItem.amount)) {
                result.nutrients.push({
                    name: 'Iodine',
                    unit: 'μg',
                    amount: iodineItem.amount
                });

                await result.save();
            }

            console.log('Succesfully wrote values', result);
        }
    }
}