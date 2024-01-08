import SearchBar from "../components/SearchBar";

export default function BrowseFoods({}) {
    function handleSearch(term) {
        
    }

    return (
        <>
            Foods

            <SearchBar 
                placeholderText={'Search Foods'}
                onSearch={handleSearch}
            />
        </>
    )
}