export const foodTotal = food => Object.keys(food).reduce((total, key) => {
    if ([
            'histidine',
            'isoleucine',
            'leucine',
            'lysine',
            'methionine',
            'phenylalanine',
            'threonine',
            'tryptophan',
            'valine'
        ].includes(key)) {                                        
            return total + food[key]; 
        } else {
            return total + 0;
        }
}, 0).toFixed(3)