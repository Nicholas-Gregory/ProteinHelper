export const NUTRIENT_NAMES = {
    PROTEIN: [
        'Total Protein',
        'Histidine',
        'Isoleucine',
        'Leucine',
        'Lysine',
        'Methionine',
        'Phenylalanine',
        'Threonine',
        'Tryptophan',
        'Valine'
    ],
    VITAMIN_ACID: [
        'Vitamin B-12',
        'Vitamin D',
        'DHA Omega-3',
        'ALA Omega-3',
        'EPA Omega-3',
    ],
    MINERAL: [
        'Calcium, Ca',
        'Iron, Fe',
        'Zinc, Zn',
        'Iodine'
    ]
}

export function getNutrientCategory(food, nutrientId) {
    let nutrientsArrayName;
    let nutrientIndex;
    let unitsArrayName;

    nutrientIndex = food.proteinNutrients.findIndex(nutrient => nutrient._id === nutrientId);
    if (nutrientIndex !== -1) {
        nutrientsArrayName = 'proteinNutrients';
        unitsArrayName = 'proteinNutrientUnits';
    }

    if (!nutrientsArrayName) {
        nutrientIndex = food.vitaminAndAcidNutrients.findIndex(nutrient => nutrient._id === nutrientId);
        if (nutrientIndex !== -1) {
            nutrientsArrayName = 'vitaminAndAcidNutrients';
            unitsArrayName = 'vitaminAndAcidNutrientUnits';
        }
    }

    if (!nutrientsArrayName) {
        nutrientIndex = food.mineralNutrients.findIndex(nutrient => nutrient._id === nutrientId);
        if (nutrientIndex !== -1) {
            nutrientsArrayName = 'mineralNutrients';
            unitsArrayName = 'mineralNutrientUnits';
        }
    }

    return { nutrientsArrayName, nutrientIndex, unitsArrayName };
}