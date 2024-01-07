import { useState } from "react"
import FoodViewer from "./FoodViewer";
import SearchBar from "./SearchBar";
import FoodList from "./FoodList";
import AminoLevelsViewer from "./AminoLevelsViewer";

export default function Creator({}) {
    const [foods, setFoods] = useState([]);
    const [searchingState, setSearchingState] = useState(null);
    const [foodSearchResults, setFoodSearchResults] = useState([]);

    function handleNewClick() {
        setSearchingState('searching');
    }

    function handleSearch() {
        setSearchingState('selecting');

        setFoodSearchResults([
            {
                _id: 1,
                name: 'food1',
                histidine: 1,
                isoleucine: 2
            },
            {
                _id: 2,
                name: 'food2',
                histidine: .5,
                isoleucine: 1
            }
        ])
    }

    function handleResultSelect(id) {
        setFoods([...foods, foodSearchResults.find(food => food._id === id)]);

        setFoodSearchResults([]);

        setSearchingState(null);
    }

    return (
        <>
            {foods.map(food => 
                <FoodViewer 
                    key={food._id}
                    food={food} 
                />
            )}

            {searchingState === 'searching' && 
                <SearchBar
                    placeholderText={'Search Foods'}
                    onSearch={handleSearch}
                />
            }

            {searchingState === 'selecting' &&
                <FoodList
                    foods={foodSearchResults}
                    onSelect={handleResultSelect}
                />
            }

            {searchingState === null && <button onClick={handleNewClick}>+</button>}

            <div 
                className="tab-title tab-selected"
                style={{ marginTop: '5px' }}    
            >
                Totals:
            </div>
            <AminoLevelsViewer
                aminos={foods.reduce((totals, food) =>
                    totals.map(total => ({ 
                        name: total.name, 
                        amount: total.amount + (food[total
                            .name
                            .substring(0,1)
                            .toLowerCase() + total.name
                            .substring(1)] || 0)
                    }))
                     , [
                        { name: 'Histidine', amount: 0 },
                        { name: 'Isoleucine', amount: 0 },
                        { name: 'Leucine', amount: 0 },
                        { name: 'Lysine', amount: 0 },
                        { name: 'Methionine', amount: 0 },
                        { name: 'Phenylalanine', amount: 0 },
                        { name: 'Threonine', amount: 0 },
                        { name: 'Tryptophan', amount: 0 },
                        { name: 'Valine', amount: 0 }
                     ]
                )}
            />
        </>
    )
}