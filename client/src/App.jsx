import AminoLevelsViewer from "./AminoLevelsViewer";
import AutoCompleteList from "./AutoCompleteList";
import SearchBar from "./SearchBar";

export default function App({}) {
    return (
        <>
            <SearchBar placeholderText={"Search Foods"} onSearch={term => console.log(term)} />
        </>
    )
}