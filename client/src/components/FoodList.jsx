export default function FoodList({ foods, onSelect }) {
    return (
        <>
            <div
                className="tab-title tab-selected"
            >
                Search Results
            </div>
            <div
                className="tab-content"
            >
                {foods.map(food =>
                    <div 
                        key={food._id}
                        onClick={() => onSelect(food._id)}
                        style={{
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}
                    >
                        <div
                            className="tab-title tab-selected"
                        >
                            {food.name}
                        </div>
                        <div
                            className="tab-content"
                        >
                            Total EAA Level (per 100g): &nbsp;
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
                                        return total + 0;
                                    }
                            }, 0).toFixed(3)}
                        </div>
                    </div>    
                )}
            </div>
        </>
    )
}