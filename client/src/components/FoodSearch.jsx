import { Fragment, useState } from "react";
import SearchBar from "./SearchBar";

export default function FoodSearch({
    placeholderText
}) {
    const [searchMode, setSearchMode] = useState('named');
    const [advancedSearchOptions, setAdvancedSearchOptions] = useState({
        histidine: { modifier: 'gte', value: 0 },
        isoleucine: { modifier: 'gte', value: 0 },
        leurcine: { modifier: 'gte', value: 0 },
        lysine: { modifier: 'gte', value: 0 },
        methionine: { modifier: 'gte', value: 0 },
        phenylalanine: { modifier: 'gte', value: 0 },
        threonine: { modifier: 'gte', value: 0 },
        tryptophan: { modifier: 'gte', value: 0 },
        valine: { modifier: 'gte', value: 0 },
    })

    function handleNamedSearch(term) {

    }

    function handleAdvancedSearchSubmit(e) {
        e.preventDefault();

    }

    return (
        <div>
            <div
                className={`tab-title${searchMode === 'named' ? ' tab-selected' : ''}`}
                style={{
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
                onClick={() => setSearchMode('named')}
            >
                Search by Name
            </div>
            <div
                className={`tab-title${searchMode === 'advanced' ? ' tab-selected' : ''}`}
                style={{
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
                onClick={() => setSearchMode('advanced')}
            >
                Advanced Search
            </div>
            <div className="tab-content">
                {searchMode === 'named' &&
                    <SearchBar
                        placeholderText={placeholderText}
                        onSearch={handleNamedSearch}
                    />
                }
                {searchMode === 'advanced' &&
                    <>
                        <form
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '105px 300px'
                            }}
                        >
                            {
                                [
                                    'histidine',
                                    'isoleucine',
                                    'leurcine',
                                    'lysine',
                                    'methionine',
                                    'phenylalanine',
                                    'threonine',
                                    'tryptophan',
                                    'valine'
                                ].map((aminoName, index) =>
                                    <Fragment key={index}>
                                        <label 
                                            htmlFor={`${aminoName}-advanced-search-input`}
                                        >
                                            {aminoName
                                            .substring(0, 1)
                                            .toUpperCase() + aminoName
                                            .substring(1)}: &nbsp;
                                        </label>
                                        <div
                                            style={{
                                                marginBottom: '5px'
                                            }}
                                        >
                                            <select
                                                id={`${aminoName}-advanced-search-modifier-select`}
                                                value={advancedSearchOptions[aminoName].modifier}
                                                onChange={e => setAdvancedSearchOptions({
                                                    ...advancedSearchOptions,
                                                    [aminoName]: {
                                                        ...advancedSearchOptions[aminoName],
                                                        modifier: e.target.value
                                                    }
                                                })}
                                            >
                                                <option value='gte'>At Least</option>
                                                <option value='e'>Exactly</option>
                                                <option value='lte'>At Most</option>
                                            </select>
                                            <input
                                                id={`${aminoName}-advanced-search-input`}
                                                type="number"
                                                step={0.01}
                                                value={advancedSearchOptions[aminoName].value}
                                                onChange={e => setAdvancedSearchOptions({
                                                    ...advancedSearchOptions,
                                                    [aminoName]: {
                                                        ...advancedSearchOptions[aminoName],
                                                        value: Number(e.target.value)
                                                    }
                                                })}
                                            />
                                            g
                                        </div>
                                    </Fragment>    
                                )     
                            }
                            <button
                                onClick={handleAdvancedSearchSubmit}
                            >
                                Submit
                            </button>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}