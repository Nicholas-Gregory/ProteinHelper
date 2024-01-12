import { Fragment, useState } from "react";
import SearchBar from "./SearchBar";
import TabNav from "./TabNav";

export default function FoodSearch({
    onNamedSearch,
    onAdvancedSearch
}) {
    const [searchMode, setSearchMode] = useState('named');
    const [advancedSearchNameInput, setAdvancedSearchNameInput] = useState('');
    const [advancedSearchOptions, setAdvancedSearchOptions] = useState({
        histidine: { modifier: 'n', value: 0 },
        isoleucine: { modifier: 'n', value: 0 },
        leurcine: { modifier: 'n', value: 0 },
        lysine: { modifier: 'n', value: 0 },
        methionine: { modifier: 'n', value: 0 },
        phenylalanine: { modifier: 'n', value: 0 },
        threonine: { modifier: 'n', value: 0 },
        tryptophan: { modifier: 'n', value: 0 },
        valine: { modifier: 'n', value: 0 },
    })

    function handleNamedSearch(term) {
        onNamedSearch(term);
    }

    function handleAdvancedSearchSubmit(e) {
        e.preventDefault();

        onAdvancedSearch(advancedSearchOptions, advancedSearchNameInput);
    }

    function handleSearchModeSelect(name) {
        setSearchMode(name);
    }

    return (
        <div>
            <TabNav
                tabs={[
                    {
                        text: 'Search by Name',
                        name: 'named'
                    },
                    {
                        text: 'Advanced Search',
                        name: 'advanced'
                    }
                ]}
                defaultActiveTabName={'named'}
                onSelect={handleSearchModeSelect}
            />
            
            <div className="tab-content">
                {searchMode === 'named' &&
                    <SearchBar
                        placeholderText={'Search Foods by Name'}
                        onSearch={handleNamedSearch}
                    />
                }
                {searchMode === 'advanced' &&
                    <>
                        <label htmlFor="advanced-search-name-input">
                            Name: 
                        </label>
                        &nbsp;
                        <input
                            id="advanced-search-name-input"
                            type='text'
                            value={advancedSearchNameInput}
                            onChange={e => setAdvancedSearchNameInput(e.target.value)}
                            placeholder="Leave blank to not search by name"
                            size={33}
                            style={{
                                marginBottom: '5px'
                            }}
                        />
                        <p>
                            Per 100g:
                        </p>
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
                                                <option value='n'>--</option>
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
                                                disabled={advancedSearchOptions[aminoName].modifier === 'n' ? true : false}
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