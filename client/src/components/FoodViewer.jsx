import AminoLevelsViewer from "./AminoLevelsViewer";

export default function FoodViewer({ 
    food, 
    onChangeUnit,
    onChangeAmount,
    onCreateWithButtonClick 
}) {
    function handleChangeUnit(newValue) {
        onChangeUnit(food._id, newValue);
    }

    function handleChangeAmount(newValue) {
        onChangeAmount(food._id, newValue);
    }

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
                    amount: food[key]
                }))}
            />
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