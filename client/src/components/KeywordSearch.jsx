import { useState } from "react";
import SearchBar from "./SearchBar";

export default function KeywordSearch({ 
    placeholderText,
    onKeywordsChange
}) {
    const [terms, setTerms] = useState([]);

    function handleSearchInput(input) {
        const newTerms = [...terms, ...input.split(' ')];

        setTerms(newTerms);

        onKeywordsChange(newTerms);
    }

    function handleRemoveTermClick(removedIndex) {
        const newTerms = terms.filter((term, index) => index !== removedIndex);

        setTerms(newTerms);

        onKeywordsChange(newTerms);
    }

    return (
        <>
            <SearchBar 
                placeholderText={placeholderText} 
                onSearch={handleSearchInput}
            />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {terms.map((term, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            border: 'thin solid black',
                            borderRadius: '3px',
                            padding: '3px',
                            margin: '3px'
                        }}
                    >
                        <span>{term}</span> &nbsp;
                        <button
                            onClick={() => handleRemoveTermClick(index)}
                            style={{
                                backgroundColor: 'red'
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}