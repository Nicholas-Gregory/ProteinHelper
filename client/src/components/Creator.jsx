import { useState } from "react"
import FoodViewer from "./FoodViewer";
import SearchBar from "./SearchBar";
import FoodList from "./FoodList";
import AminoLevelsViewer from "./AminoLevelsViewer";
import FoodSearch from "./FoodSearch";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

export default function Creator({ editing }) {
    const [foods, setFoods] = useState([]);
    const [searchingState, setSearchingState] = useState(null);
    const [foodSearchResults, setFoodSearchResults] = useState([]);
    const { authorize } = useAuth();

    function handleNewClick() {
        setSearchingState('searching');
    }

    async function handleNamedSearch(term) {
        setSearchingState('selecting');

        setFoodSearchResults(await apiCall('GET', `/food/search/named?term=${term}`, null, authorize()))
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
                <FoodSearch
                    placeholderText={'Search Foods'}
                    onNamedSearch={handleNamedSearch}
                />
            }

            {searchingState === 'selecting' &&
                <FoodList
                    foods={foodSearchResults}
                    onSelect={handleResultSelect}
                />
            }

            {searchingState === null && editing && <button onClick={handleNewClick}>+</button>}

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
                frozen={true}
            />
        </>
    )
}