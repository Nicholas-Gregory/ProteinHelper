import { useState } from "react";
import CreationViewer from "../components/CreationViewer";
import SearchBar from '../components/SearchBar'

export default function BrowseCreations({}) {
    const [searchTerms, setSearchTerms] = useState([]);

    function handleTermSearch(term) {
        setSearchTerms([...searchTerms, term])
    }

    return (
        <>
            Creations

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {searchTerms.map((term, index) =>
                    <div
                        key={index}
                        style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                            padding: '3px',
                            margin: '3px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {term}

                        <button
                            style={{
                                paddingLeft: '5px',
                                paddingRight: '5px',
                                border: '1px solid black',
                                borderRadius: '3px',
                                margin: '3px',
                                backgroundColor: 'red',
                            }}
                            onClick={() => setSearchTerms(searchTerms.filter((term, i) => index !== i))}
                        >
                            x
                        </button>
                    </div>
                )}
            </div>
            <SearchBar 
                placeholderText={'Search by Food, Creation Name, or Creator Username'}
                onSearch={handleTermSearch}
            />

            <br />
            <CreationViewer creation={{
                name: 'creation',
                foods: [
                    {
                        name: 'food1',
                        histidine: 2,
                        isoleucine: 1
                    },
                    {
                        name: 'food2',
                        histidine: 1,
                        isoleucine: 2
                    }
                ]
            }} />
        </>
    )
}