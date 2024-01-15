import { useEffect, useState } from "react"
import FoodList from "./FoodList";
import AminoLevelsViewer from "./AminoLevelsViewer";
import FoodSearch from "./FoodSearch";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

const UNITS = [
    { unit: 'g', factor: 1 },
    { unit: 'oz', factor: 0.035274 },
    { unit: 'lb', factor: 0.00220462 }
]

export default function Creator({ creationId }) {
    const [nameInput, setNameInput] = useState([]);
    const [foods, setFoods] = useState([]);
    const [foodUnits, setFoodUnits] = useState([]);
    const [foodAmounts, setFoodAmounts] = useState([]);
    const [foodSearchResults, setFoodSearchResults] = useState([]);
    const [totalsUnit, setTotalsUnit] = useState('g');
    const [message, setMessage] = useState(null);
    const { authorize, user } = useAuth();

    useEffect(() => {
        (async () => {
            if (creationId) {
                const response = await apiCall('GET', '/creation', null, authorize());

                if (response.error) {
                    const type = response.type;

                    if (type === 'TokenExpiredError') {
                        setMessage('Your session has expired.');
                        return;
                    } else if (type === 'JsonWebTokenError') {
                        setMessage('You must be logged in to do this.');
                        return;
                    }

                    setMessage('An error occurred.');
                    return;
                }

                setNameInput(response.name);
                setFoods(response.foods);
                
                for (let food in response.foods) {
                    setFoodUnits([...foodUnits, food.unit]);
                    setFoodAmounts([...foodAmounts, food.amount]);
                }
            }
        })();
    }, [creationId])

    function getAmountNumber(per100g, amount, unit) {
        return amount / 100 * per100g * UNITS
        .find(unitObject => unitObject.unit === unit)
        .factor;
    }

    async function handleNamedSearch(term) {
        const response = await apiCall('GET', `/food/search/named?term=${term}`, null, authorize());

        setMessage(null);

        if (response.error) {
            if (response.type === 'JsonWebTokenError') {
                setMessage('You must be logged in to view this resource.');
            } else if (response.type === 'TokenExpiredError') {
                setMessage('Your session has expired.')
            } else {
                setMessage('There was an error processing your response');
            }

            return;
        }

        setFoodSearchResults(response);
    }

    async function handleAdvancedSearch(options, name) {
        const response = await apiCall('POST', `/food/search/advanced${name ? `?name=${name}` : ''}`, options, authorize());

        setMessage(null);

        if (response.error) {
            setMessage('There was an error processing your request.');
        }

        setFoodSearchResults(response);
    }

    function handleResultSelect(id) {
        setFoods([...foods, foodSearchResults.find(food => food._id === id)]);
        setFoodUnits([...foodUnits, 'g'])
        setFoodAmounts([...foodAmounts, 100]);

        setFoodSearchResults([]);
    }

    async function handleSaveButtonClick() {
        if (nameInput === '') {
            setMessage('Creations require a name');

            return;
        }

        const foodData = foods.map((food, index) => ({
            food: food._id,
            unit: foodUnits[index],
            amount: foodAmounts[index]
        }));

        const creationData = {
            name: nameInput,
            userId: user.id,
            foods: foodData
        }

        const response = await apiCall('POST', '/creation', creationData, authorize());
        //creationId && separate call for PUT /creation/:id
        if (response.error) {
            setMessage('There was an error processing your request.')

            return;
        }

        setMessage(response.message);
    }

    return (
        <>
            {foods.length > 0 &&
                <>
                    <br />
                    <label htmlFor="name-input">
                        Creation Name:
                    </label>
                    &nbsp;
                    <input
                        id="name-input"
                        type="text"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                    />
                </>
            }

            <br />
            <FoodSearch
                placeholderText={'Search Foods'}
                onNamedSearch={handleNamedSearch}
                onAdvancedSearch={handleAdvancedSearch}
            />

            {foods.map((food, index) => 
                <>
                    <div className="tab-title tab-selected">
                        {food.name}
                    </div>
                    <div className="tab-content">
                        <label htmlFor={`food-${index}-unit-select`}>
                            Unit: 
                        </label>
                        &nbsp;
                        <select
                            id={`food-${index}-unit-select`}
                            value={foodUnits[index]}
                            onChange={e => setFoodUnits(foodUnits.map((u, i) => i === index ? e.target.value : u))}
                        >
                            {UNITS.map(unitObject =>
                                <option value={unitObject.unit}>{unitObject.unit}</option>    
                            )}
                        </select>
                        <br />
                        <label htmlFor={`food-${index}-amount-input`}>
                            Amount:
                        </label>
                        &nbsp;
                        <input
                            id={`food-${index}-amount-input`}
                            type="number"
                            step={0.01}
                            value={foodAmounts[index]}
                            onChange={e => setFoodAmounts(foodAmounts.map((u, i) => i === index ? e.target.value : u))}
                        />
                        <AminoLevelsViewer 
                            aminos={Object.keys(food)
                            .filter(key => [
                                'histidine',
                                'isoleucine',
                                'leucine',
                                'lysine',
                                'methionine',
                                'phenylalanine',
                                'threonine',
                                'tryptophan',
                                'valine'
                            ].includes(key))
                            .map(key => ({
                                name: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
                                amount: getAmountNumber(food[key], foodAmounts[index], foodUnits[index]),
                                unit: foodUnits[index]
                            }))}
                        />
                    </div>
                </>
            )}

            {foods.length > 1 &&
                <>
                    <div 
                        className="tab-title tab-selected"
                        style={{ marginTop: '5px' }}    
                    >
                        Totals:
                    </div>
                    <div className="tab-content">
                        <label htmlFor="totals-unit">
                            Unit:
                        </label>
                        &nbsp;
                        <select
                            id="totals-unit"
                            value={totalsUnit}
                            onChange={e => setTotalsUnit(e.target.value)}
                        >
                            <option value='g'>g</option>
                            <option value='oz'>oz</option>
                            <option value='lb'>lb</option>
                        </select>
                        <AminoLevelsViewer
                            aminos={foods.reduce((totals, food, index) => {
                                if (foodUnits[index] === 'g') {
                                    if (totalsUnit === 'g') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'g')
                                        }));
                                    } else if (totalsUnit === 'oz') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'g') * UNITS.find(u => u.unit === 'oz').factor)
                                        }))
                                    } else if (totalsUnit === 'lb') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'g') * UNITS.find(u => u.unit === 'lb').factor)
                                        }));
                                    }
                                } else if (foodUnits[index] === 'oz') {
                                    if (totalsUnit === 'oz') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'oz')
                                        }))
                                    } else if (totalsUnit === 'g') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'oz') * 28.3495)
                                        }))
                                    } else if (totalsUnit === 'lb') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'oz') * 0.0625)
                                        }));
                                    }
                                } else if (foodUnits[index] === 'lb') {
                                    if (totalsUnit === 'lb') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'lb')
                                        }))
                                    } else if (totalsUnit === 'g') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'lb') / UNITS.find(u => u.unit === 'lb').factor)
                                        }))
                                    } else if (totalsUnit === 'oz') {
                                        return totals.map(total => ({
                                            name: total.name,
                                            amount: total.amount + (getAmountNumber(food[total.name.toLowerCase()], foodAmounts[index], 'lb') * 16)
                                        }))
                                    }
                                }
                            }, [
                                { name: 'Histidine', amount: 0 },
                                { name: 'Isoleucine', amount: 0 },
                                { name: 'Leucine', amount: 0 },
                                { name: 'Lysine', amount: 0 },
                                { name: 'Methionine', amount: 0 },
                                { name: 'Phenylalanine', amount: 0 },
                                { name: 'Threonine', amount: 0 },
                                { name: 'Tryptophan', amount: 0 },
                                { name: 'Valine', amount: 0 }
                            ])}
                            frozen={true}
                        />
                    </div>
                </>
            }

            <br />
            {foodSearchResults.length > 0 &&
                <FoodList
                    foods={foodSearchResults}
                    onSelect={handleResultSelect}
                />
            }

            {foods.length > 0 &&
                <button
                    onClick={handleSaveButtonClick}
                >
                    Save
                </button>
            }

            {message &&
                <p>
                    {message}
                </p>
            }
        </>
    )
}