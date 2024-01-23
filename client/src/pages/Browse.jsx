import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TabCard from "../components/TabCard";
import KeywordSearch from "../components/KeywordSearch";

export default function Browse({}) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleKeywordsChange(terms) {
        
    }

    return (
        <>
            <KeywordSearch
                placeholderText={'Search Creations'}
                onKeywordsChange={handleKeywordsChange}
            />

            {(loading || searchResults.length > 0) && (
                <TabCard title={'Search Results'}>
                    
                </TabCard>
            )}
        </>
    )
}