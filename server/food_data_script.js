const Food = require('./models/Food.js');
const data = require('./food_data.json').SRLegacyFoods;
const mongoose = require('mongoose');
require('dotenv').config();

let db;

mongoose.connect(process.env.DB_CONN_URL)
.then(connection => {
    db = connection;

    createData();
});

async function createData() {
    for (let item of data) {
        if (item.foodNutrients.some(nutrient => {
            let name = nutrient.nutrient.name;

            if (
                name === 'Histidine' ||
                name === 'Isoleucine' ||
                name === 'Leucine' ||
                name === 'Lysine' ||
                name === 'Methionine' ||
                name === 'Phenylalanine' ||
                name === 'Threonine' ||
                name === 'Tryptophan' ||
                name === 'Valine'
            ) return true;

            return false;
        })) {
            let result = await Food.create({
                name: item.description,
                histidine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Histidine')?.amount,
                isoleucine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Isoleucine')?.amount,
                leucine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Leucine')?.amount,
                lysine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Lysine')?.amount,
                methionine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Methionine')?.amount,
                phenylalanine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Phenylalanine')?.amount,
                threonine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Threonine')?.amount,
                tryptophan: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Tryptophan')?.amount,
                valine: item.foodNutrients.find(nutrient => nutrient.nutrient.name === 'Valine')?.amount
            })

            console.log('Succesfully wrote values', result);
        }
    }

    db.disconnect();
}