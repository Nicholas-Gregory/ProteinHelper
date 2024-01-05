import AminoLevelsViewer from "./AminoLevelsViewer";
import AutoCompleteList from "./AutoCompleteList";
import FoodList from "./FoodList";
import FoodViewer from "./FoodViewer";
import SearchBar from "./SearchBar";

import './style.css';

function handleClick(id) {
    console.log(id);
}

export default function App({}) {
    return (
        <>
            <FoodViewer
                food={{
                    _id: 1,
                    name: 'food',
                    histidine: 2,
                    phenylalanine: 3,
                    leucine: 4
                }}
                onCreateWithButtonClick={handleClick}
            />
        </>
    )
}