export const AMINO_NAMES = [
    'histidine',
    'isoleucine',
    'leucine',
    'lysine',
    'methionine',
    'phenylalanine',
    'threonine',
    'tryptophan',
    'valine'
];

export const foodTotal = food => Object.keys(food).reduce((total, key) => {
    if (AMINO_NAMES.includes(key)) {                                        
            return total + food[key]; 
        } else {
            return total + 0;
        }
}, 0)

export const getAminosArray = food => Object.keys(food).reduce((array, key) => {
    if (AMINO_NAMES.includes(key)) {
        return [...array, {
            name: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
            unit: 'g',
            amount: food[key]
        }]
    } else {
        return array;
    }
}, [])