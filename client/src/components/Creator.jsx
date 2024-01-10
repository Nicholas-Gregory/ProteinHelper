import { useState } from "react"
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

export default function Creator({ editing }) {
    const [foods, setFoods] = useState([]);
    const [foodUnits, setFoodUnits] = useState([]);
    const [foodAmounts, setFoodAmounts] = useState([]);
    const [searchingState, setSearchingState] = useState(null);
    const [foodSearchResults, setFoodSearchResults] = useState([]);
    const [totalsUnit, setTotalsUnit] = useState('g');
    const [error, setError] = useState(null);
    const { authorize } = useAuth();

    function getAmountNumber(per100g, amount, unit) {
        return amount / 100 * per100g * UNITS
        .find(unitObject => unitObject.unit === unit)
        .factor;
    }

    function handleNewClick() {
        setSearchingState('searching');
    }

    async function handleNamedSearch(term) {
        const response = await apiCall('GET', `/food/search/named?term=${term}`, null, authorize());

        setError(null);

        if (response.error) {
            if (response.type === 'JsonWebTokenError') {
                setError('You must be logged in to view this resource.');
            } else if (response.type === 'TokenExpiredError') {
                setError('Your session has expired.')
            } else {
                setError('There was an error processing your response');
            }

            return;
        }

        setSearchingState('selecting');

        setFoodSearchResults(response);
    }

    function handleResultSelect(id) {
        setFoods([...foods, foodSearchResults.find(food => food._id === id)]);
        setFoodUnits([...foodUnits, 'g'])
        setFoodAmounts([...foodAmounts, 100]);

        setFoodSearchResults([]);
        setSearchingState(null);
    }

    return (
        <>
            <br />
            {foods.map((food, index) => 
                <>
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
                    <div className="tab-title tab-selected">
                        {food.name}
                    </div>
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
                </>
            )}

            {searchingState === 'searching' && 
                <FoodSearch
                    placeholderText={'Search Foods'}
                    onNamedSearch={handleNamedSearch}
                />
            }

            {searchingState === null && editing && <button onClick={handleNewClick}>+</button>}

            <br />
            <label htmlFor="totals-unit">
                Unit for Totals:
            </label>
            <select
                id="totals-unit"
                value={totalsUnit}
                onChange={e => setTotalsUnit(e.target.value)}
            >
                <option value='g'>g</option>
                <option value='oz'>oz</option>
                <option value='lb'>lb</option>
            </select>

            <div 
                className="tab-title tab-selected"
                style={{ marginTop: '5px' }}    
            >
                Totals:
            </div>
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

            <br />
            {searchingState === 'selecting' &&
                <FoodList
                    foods={foodSearchResults}
                    onSelect={handleResultSelect}
                />
            }

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}