import AminoLevelsViewer from "./AminoLevelsViewer";
import AutoCompleteList from "./AutoCompleteList";
import FoodList from "./FoodList";
import SearchBar from "./SearchBar";

import './style.css';

export default function App({}) {
    return (
        <>
            <FoodList foods={[
                {
                    _id: 1,
                    name: 'Food',
                    histidine: 2,
                    isoleucine: 1
                },
                {
                    _id: 2,
                    name: 'Another',
                    histidine: 1,
                    isoleucine: 1
                }
            ]} onSelect={id => console.log(id)}/>
        </>
    )
}