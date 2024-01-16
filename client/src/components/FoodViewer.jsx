import AminoLevelsViewer from "./AminoLevelsViewer";

export default function FoodViewer({ 
    food,
    onCreateWithButtonClick 
}) {
    return (
        <div
            style={{
                marginTop: '5px',
                marginBottom: '5px'
            }}
        >
            <div className="tab-title tab-selected">
                {food.name}
            </div>
            <div className="tab-content">
                <AminoLevelsViewer 
                    aminos={Object.keys(food)
                    .filter(key => [
                        'histidine',
                        'isoleucine',
                        'leucine',
                        'lysine',
                        'methionine',
                        'phenylalanine',
                        'threonine',
                        'tryptophan',
                        'valine'
                    ].includes(key))
                    .map(key => ({
                        name: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
                        amount: food[key],
                        unit: 'g'
                    }))}
                />
            </div>

            <br />
            {onCreateWithButtonClick && 
                <button
                    onClick={() => onCreateWithButtonClick(food._id)}
                >
                    Create With This Food
                </button>
            }
        </div>
    )

}