export default function FoodList({ foods, onSelect }) {
    return (
        <div
            className="list-container"
        >
            {foods.map(food =>
                <div 
                    key={food._id}
                    className="list-item"
                    onClick={() => onSelect(food._id)}
                    style={{
                        cursor: 'grab'
                    }}
                >
                    <div
                        className="list-item-title"
                    >
                        {food.name}
                    </div>
                    <div
                        className="list-item-content"
                    >
                        Total Protein (per 100g): &nbsp;
                        {Object.keys(food).reduce((total, key) => {
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
                                    return 0;
                                }
                        }, 0)}
                    </div>
                </div>    
            )}
        </div>
    )
}