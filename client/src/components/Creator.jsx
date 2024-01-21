import { useOutletContext } from "react-router-dom"
import FoodSearch from "./FoodSearch";
import { useEffect, useState } from "react";
import FoodListItem from "./FoodListItem";
import { apiCall } from "../utils/http";
import Loading from "./Loading";
import { useAuth } from "../contexts/UserContext";
import TabCard from "./TabCard";

export default function Creator({}) {
    const creation = useOutletContext();
    const { authorize } = useAuth();
    const [foods, setFoods] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (creation) {
            setFoods(creation.foods);
        } else {
            setFoods([]);
        }
    }, [creation])

    function handleNamedSearch(term) {
        setLoading(true);

        apiCall('GET', `/food/search/named?term=${term}`, null, authorize())
        .then(response => {
            setLoading(false);

            if (response.error) {
                setError(response.type);
                return;
            }

            setSearchResults(response);
        })
        .catch(error => setError(error));
    }

    function handleAdvancedSearch(options, name) {
        
    }

    function handleSearchResultSelect(foodId, unit, amount) {
        setSearchResults([]);

        setFoods([...foods, {
            unit,
            amount,
            food: searchResults.find(food => food._id === foodId)
        }]);
    }

    return (
        <>
            <FoodSearch
                onNamedSearch={handleNamedSearch}
                onAdvancedSearch={handleAdvancedSearch}
            />

            {foods.map(food => (
                <>
                    <FoodListItem
                        food={food.food}
                        defaultAmount={food.amount}
                        defaultUnit={food.unit}
                        select
                    />
                </>
            ))}

            {(loading || searchResults.length) > 0 && (
                <TabCard title={'Search Results'}>
                    {loading && <Loading />}
                
                    {searchResults.map(food => (
                        <FoodListItem
                            food={food}
                            select
                            use
                            onSelect={handleSearchResultSelect}
                        />
                    ))}
                </TabCard>
            )}
        </>
    )
}