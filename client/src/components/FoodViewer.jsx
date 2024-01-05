import AminoLevelsViewer from "./AminoLevelsViewer";

export default function FoodViewer({ food, onCreateWithButtonClick }) {

    return (
        <div className="th-border pad-5">
            <div className="card">
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
            <button
                onClick={() => onCreateWithButtonClick(food._id)}
            >Create With This Food</button>
        </div>
    )
}