export default function FoodList({ foods, onSelect }) {
    return (
        <div
            className="th-border pad-5"
        >
            {foods.map(food =>
                <div 
                    key={food._id}
                    className="md-border mar-5 pad-5"
                    onClick={() => onSelect(food._id)}
                >
                    <div
                        className="tab-title"
                    >
                        {food.name}
                    </div>
                    <div
                        className="tab-content"
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