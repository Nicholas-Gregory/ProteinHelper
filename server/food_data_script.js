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

const PROTEIN_NAMES = [
    'Protein',
    'Histidine',
    'Isoleucine',
    'Leucine',
    'Lysine',
    'Methionine',
    'Phenylalanine',
    'Threonine',
    'Tryptophan',
    'Valine'
];

const VITAOIL_NAMES = [
    'Vitamin B-12',
    'Vitamin B-12, added',
    'Vitamin D (D2 + D3)',
    'PUFA 18:3 n-3 c,c,c (ALA)',
    'PUFA 22:6 n-3 (DHA)',
    'PUFA 20:5 n-3 (EPA)'
];

const MINERALS_NAMES = [
    'Calcium, Ca',
    'Iron, Fe',
    'Zinc, Zn',
    'Iodine'
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
            let nutrients = item.foodNutrients
                .filter(nutrient => NUTRIENTS
                    .includes(nutrient.nutrient.name))
                .filter(nutrient => nutrient.amount > 0)
                .map(nutrient => ({
                    name: nutrient.nutrient.name,
                    unit: nutrient.nutrient.unitName,
                    amount: nutrient.amount
            }));

            const iodineItem = iodineData.find(iodineFood => Number(iodineFood.ndb) === Number(item.ndbNumber));
            if (iodineItem && !isNaN(iodineItem.amount)) {
                nutrients.push({
                    name: 'Iodine',
                    unit: 'μg',
                    amount: iodineItem.amount
                });
            }

            const result = await Food.create({
                name: item.description,
                proteinNutrients: nutrients
                .filter(nutrient => (
                    PROTEIN_NAMES
                    .includes(nutrient.name)
                ))
                .reduce((array, nutrient) => {
                    if (nutrient.name === 'Protein') {
                        return [
                            {
                                ...nutrient,
                                name: 'Total Protein'
                            },
                            ...array
                        ];
                    } else {
                        return [...array, nutrient];
                    }
                }, []),
                vitaminAndAcidNutrients: nutrients
                .filter(nutrient => (
                    VITAOIL_NAMES
                    .includes(nutrient.name)
                ))
                .reduce((result, nutrient, index, array) => {
                    if (nutrient.name === 'PUFA 22:6 n-3 (DHA)') {
                        return [
                            ...result,
                            {
                                ...nutrient,
                                name: 'DHA Omega-3'
                            }
                        ];
                    } else if (nutrient.name === 'PUFA 18:3 n-3 c,c,c (ALA)') {
                        return [
                            ...result,
                            {
                                ...nutrient,
                                name: 'ALA Omega-3'
                            }
                        ];
                    } else if (nutrient.name === 'PUFA 20:5 n-3 (EPA)') {
                        return [
                            ...result,
                            {
                                ...nutrient,
                                name: 'EPA Omega-3'
                            }
                        ];
                    } else if (nutrient.name === 'Vitamin D (D2 + D3)') {
                        return [
                            ...result,
                            {
                                ...nutrient,
                                name: 'Vitamin D'
                            }
                        ]    
                    }  else if (nutrient.name === 'Vitamin B-12' || nutrient.name === 'Vitamin B-12, added') {
                        const secondValueIndex = array.findLastIndex(element => element.name === 'Vitamin B-12' || element.name === 'Vitamin B-12, added');
    
                        if (secondValueIndex === -1) {
                            return [
                                ...result,
                                nutrient
                            ]
                        }
                        
                        if (secondValueIndex > index) {
                            return [
                                ...result,
                                {
                                    name: 'Vitamin B-12',
                                    unit: nutrient.unit,
                                    amount: nutrient.amount + array[secondValueIndex].amount
                                }
                            ]
                        }
    
                        return [...result];
                    } else {
                        return [...result, nutrient];
                    }
                }, []),
                mineralNutrients: nutrients
                .filter(nutrient => (
                    MINERALS_NAMES
                    .includes(nutrient.name)
                ))
            })

            console.log('Succesfully wrote values', result);
        }
    }
}