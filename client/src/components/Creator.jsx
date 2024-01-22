import { useOutletContext } from "react-router-dom"
import FoodSearch from "./FoodSearch";
import { Fragment, useEffect, useState } from "react";
import FoodListItem from "./FoodListItem";
import { apiCall } from "../utils/http";
import Loading from "./Loading";
import { useAuth } from "../contexts/UserContext";
import TabCard from "./TabCard";
import AminoLevelsViewer from "./AminoLevelsViewer";
import { convertUnitsSameAmount, convertAmountSameUnit } from "../utils/conversions";
import { AMINO_NAMES } from "../utils/totals";

export default function Creator({}) {
    const creation = useOutletContext();
    const { authorize } = useAuth();
    const [foods, setFoods] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalsUnit, setTotalsUnit] = useState('g');

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

    function handleRemoveClick(foodId) {
        setFoods(foods.filter((food, index) => (food._id || index) !== foodId));
    }

    function handleChangeFoodAmount(id, value) {
        setFoods(foods.map((food, index) => index === id ? { 
            ...food,
            amount: value
         } : food));
    }

    function handleChangeFoodUnit(id, value) {
        setFoods(foods.map((food, index) => index === id ? {
            ...food,
            unit: value
        } : food));
    }

    return (
        <>
            <FoodSearch
                onNamedSearch={handleNamedSearch}
                onAdvancedSearch={handleAdvancedSearch}
            />

            {foods.length > 0 && (
                <TabCard title={'Foods'}>
                    {foods.map((food, index) => (
                        <Fragment key={index}>
                            <FoodListItem
                                food={food.food}
                                id={index}
                                defaultAmount={food.amount}
                                defaultUnit={food.unit}
                                onChangeAmount={handleChangeFoodAmount}
                                onChangeUnit={handleChangeFoodUnit}
                                select
                            >
                                <button onClick={() => handleRemoveClick(food._id || index)}>Remove</button>
                            </FoodListItem>
                        </Fragment>
                    ))}
                </TabCard>
            )}

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

            {foods.length > 0 && (
                <TabCard title={'Totals'}>
                    Unit: &nbsp;
                    <select
                        value={totalsUnit}
                        onChange={e => setTotalsUnit(e.target.value)}
                    >
                        <option value={'g'}>g</option>
                        <option value={'oz'}>oz</option>
                        <option value='lb'>lb</option>
                    </select>
                    <AminoLevelsViewer
                        aminos={foods.reduce((aminos, food) => (
                            aminos.map(amino => ({
                                name: amino.name,
                                unit: totalsUnit,
                                amount: amino.amount + convertUnitsSameAmount('g', totalsUnit, convertAmountSameUnit(food.food[amino.name.toLowerCase()], 100, convertUnitsSameAmount(food.unit, 'g', food.amount)))
                            }))
                        ), AMINO_NAMES.map(name => (
                            {
                                name: `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`,
                                unit: totalsUnit,
                                amount: 0
                            }
                        )))}
                    />
                </TabCard>
            )}
        </>
    )
}