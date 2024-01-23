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

export default function Creator({ }) {
    const creation = useOutletContext();
    const { authorize, user: { id: userId } } = useAuth();
    const [foods, setFoods] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [totalsUnit, setTotalsUnit] = useState('g');
    const [nameInput, setNameInput] = useState('');
    
    useEffect(() => {
        if (creation) {
            setFoods(creation.foods);
            setNameInput(creation.name);
        } else {
            setFoods([]);
            setNameInput('');
        }
    }, [creation])

    function handleKeywordsChange(terms) {
        if (terms.length === 0) {
            setLoading(false);
            setSearchResults([]);
            return;
        }
        setLoading(true);

        apiCall('GET', `/food/search/named?terms=${terms.join()}`, null, authorize())
        .then(response => {
            setLoading(false);
            setMessage(null);

            if (response.error) {                
                setMessage(response.type);
                return;
            }

            setSearchResults(response);
        })
        
    }

    function handleAdvancedSearch(options, name) {
        setLoading(true);

        apiCall('POST', `/food/search/advanced${name ? `?name=${name}` : ''}`, options, authorize())
        .then(response => {
            setLoading(false);
            setMessage(null);

            if (response.error) {
                setMessage(response.type);
                return;
            }

            setSearchResults(response);
        })
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
        setFoods(foods.filter((food, index) => index !== foodId));
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

    async function handleSaveClick() {
        const data = {
            user: userId,
            name: nameInput,
            foods: []
        };

        for (let food of foods) {
            data.foods.push({
                food: food.food._id,
                unit: food.unit,
                amount: food.amount
            });
        }

        if (creation) {
            const response = await apiCall('PUT', `/creation/${creation._id}`, data, authorize());

            setMessage(null);

            if (response.error) {
                setMessage(response.type);
                return;
            }

            setMessage('Save Successful!');
        } else {
            const response = await apiCall('POST', '/creation', data, authorize());

            setMessage(null);

            if (response.error) {
                setMessage(response.type);
                return;
            }

            setMessage(response.message);
        }
    }

    function handleSearchResultsCancelClick() {
        setLoading(false);
        setSearchResults([]);
    }

    return (
        <>
            <FoodSearch
                onKeywordsChange={handleKeywordsChange}
                onAdvancedSearch={handleAdvancedSearch}
            />

            {foods.length > 0 && (
                <>
                    <input
                        placeholder="Creation Name"
                        type="text"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                    <button
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
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
                                    <button onClick={() => handleRemoveClick(index)}>Remove</button>
                                </FoodListItem>
                            </Fragment>
                        ))}
                    </TabCard>
                </>
            )}

            {(loading || searchResults.length > 0) && (
                <TabCard title={'Search Results'}>
                    <button onClick={handleSearchResultsCancelClick}>
                        Cancel
                    </button>

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

            {message && (
                <p>
                    {message}
                </p>
            )}
        </>
    )
}