import { Fragment, useEffect, useState } from "react";
import FoodViewer from "./FoodViewer";
import TabCard from "../contexts/TabCard";
import UnitAmountForm from "./UnitAmountForm";
import { convertAmount, convertUnits } from "../utils/conversions";
import TabNav from "../contexts/TabNav";
import TabContent from "./TabContent";
import NutrientViewer from "./NutrientViewer";
import Tab from "./Tab";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";
import { NUTRIENT_NAMES } from "../utils/nutrients";
import TabCardTitle from "./TabCardTitle";
import TabCardContent from "./TabCardContent";

export default function Creator({
    combination,
    onFoodAmountChange,
    onFoodUnitChange,
    onNutrientUnitChange,
    onRemove
}) {
    const [totalsProteinNutrientUnits, setTotalsProteinNutrientUnits] = useState(getTotalsNutrientUnitsArray('proteinNutrientUnits', NUTRIENT_NAMES.PROTEIN));
    const [totalsVitaminAndAcidNutrientUnits, setTotalsVitaminAndAcidNutrientUnits] = useState(getTotalsNutrientUnitsArray('vitaminAndAcidNutrientUnits', NUTRIENT_NAMES.VITAMIN_ACID));
    const [totalsMineralNutrientUnits, setTotalsMineralNutrientUnits] = useState(getTotalsNutrientUnitsArray('mineralNutrientUnits', NUTRIENT_NAMES.MINERAL));
    const [totalsTab, setTotalsTab] = useState('protein');
    const [naming, setNaming] = useState(false);
    const [namingInput, setNamingInput] = useState('');
    const [namingError, setNamingError] = useState(null);
    const { user: { id }, authorize } = useAuth();
    const namingBoxWidth = 250;
    const namingBoxHeight = 150;

    useEffect(() => {
        setTotalsProteinNutrientUnits(getTotalsNutrientUnitsArray('proteinNutrientUnits', NUTRIENT_NAMES.PROTEIN, totalsProteinNutrientUnits));
        setTotalsVitaminAndAcidNutrientUnits(getTotalsNutrientUnitsArray('vitaminAndAcidNutrientUnits', NUTRIENT_NAMES.VITAMIN_ACID, totalsVitaminAndAcidNutrientUnits));
        setTotalsMineralNutrientUnits(getTotalsNutrientUnitsArray('mineralNutrientUnits', NUTRIENT_NAMES.MINERAL, totalsMineralNutrientUnits));
    }, [combination]);

    function getTotalsNutrientUnitsArray(arrayName, nameArray, oldArray) {
        let result = nameArray.map(name => ({ name }));
        
        for (let i = 0; i < combination.foods.length; i++) {
            result = result
            .map(nutrient => ({
                name: nutrient.name,
                unit: (combination.foods[i][arrayName]
                .find(n => n.name === nutrient.name) || (oldArray ? oldArray.find(n => n.name === nutrient.name) : null) || { unit: null })
                .unit
            }));
        }

        return result.filter(n => n.unit);
    }

    function getTotalsNutrientArray(arrayName) {
        let result;

        const getUnit = nutrient => {
            let result;

            for (let food of combination.foods) {
                result = food.food[arrayName].find(n => n.name === nutrient.name);

                if (result) break;
            }

            return result.unit;
        }

        if (arrayName === 'proteinNutrients') {
            result = totalsProteinNutrientUnits.map(nutrient => ({
                name: nutrient.name,
                amount: 0,
                unit: getUnit(nutrient)
            }));
        } else if (arrayName === 'vitaminAndAcidNutrients') {
            result = totalsVitaminAndAcidNutrientUnits.map(nutrient => ({
                name: nutrient.name,
                amount: 0,
                unit: getUnit(nutrient)
            }));
        } else if (arrayName === 'mineralNutrients') {
            result = totalsMineralNutrientUnits.map(nutrient => ({
                name: nutrient.name,
                amount: 0,
                unit: getUnit(nutrient)
            }));
        }

        for (let food of combination.foods) {
            result = result.map(nutrient => ({
                ...nutrient,
                amount: nutrient.amount + convertAmount((food.food[arrayName]
                    .find(n => n.name === nutrient.name) || { amount: 0 })
                    .amount, convertUnits(100, 'g', food.unit), food.amount)
            }))
        }

        return result;
    }

    async function handleSaveNewClick() {
        const response = await apiCall('POST', '/creation', {
            user: id,
            name: namingInput,
            foods: combination.foods.map(food => ({
                food: food.food._id,
                unit: food.unit,
                amount: food.amount
            }))
        }, authorize());

        setNamingError(null);

        if (response.error) {
            setNamingError(response.type);
            return;
        }

        setNaming('done')
    }

    return (
        <>
            {naming && (
                <div
                    style={{
                        width: `${namingBoxWidth}px`,
                        height: `${namingBoxHeight}px`,
                        position: 'fixed',
                        top: `${window.innerHeight / 2 - namingBoxHeight / 2}px`,
                        left: `${window.innerWidth / 2 - namingBoxWidth / 2}px`,
                        backgroundColor: 'crimson',
                        borderRadius: '5px',
                        border: 'thin solid black',
                        boxShadow: '7px 7px 15px black',
                        padding: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 1
                    }}
                >
                    <div>
                        Name your Combination:
                    </div>
                    <input
                        type="text"
                        placeholder="Type Combination Name"
                        value={namingInput}
                        onChange={e => setNamingInput(e.target.value)}
                        style={{
                            position: 'absolute',
                            top: '45%'
                        }}
                        disabled={naming === 'done'}
                    />
                    {naming !== 'done' && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '5px'
                            }}
                        >
                            <button 
                                onClick={handleSaveNewClick}
                            >
                                Save
                            </button>
                            &nbsp;
                            <button
                                onClick={() => setNaming(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    {namingError && (
                        <div>
                            {namingError}
                        </div>
                    )}
                    {naming === 'done' && (
                        <>
                            <div>
                                Save Successful!
                            </div>
                            <button onClick={() => setNaming(false)}>
                                OK
                            </button>
                        </>
                    )}
                </div>
            )}
            <TabCard color='cadetblue'>
                <TabCardTitle>
                    <h4>
                        {combination.name || 'New Combination'}
                    </h4>
                </TabCardTitle>
                <TabCardContent>
                    <button onClick={() => setNaming('naming')}>
                        Save
                    </button>
                    
                    <br />
                    <br />
                    <strong>
                        Foods
                    </strong>
                    <hr />
                    {combination.foods.map((food, index) => (
                        <Fragment key={index}>
                            <FoodViewer
                                id={index}
                                food={food.food}
                                amountsAndUnits={{
                                    unit: food.unit,
                                    amount: food.amount,
                                    proteinNutrientUnits: food.proteinNutrientUnits,
                                    vitaminAndAcidNutrientUnits: food.vitaminAndAcidNutrientUnits,
                                    mineralNutrientUnits: food.mineralNutrientUnits
                                }}
                                onNutrientUnitChange={(foodId, nutrientId, value) => onNutrientUnitChange(foodId, nutrientId, value)}
                            >
                                <button onClick={() => onRemove(index)}>
                                    Remove
                                </button>

                                <br />
                                <br />
                                <UnitAmountForm
                                    id={index}
                                    unit={food.unit}
                                    amount={food.amount}
                                    onAmountChange={(id, value) => onFoodAmountChange(id, value)}
                                    onUnitChange={(id, value) => onFoodUnitChange(id, value)}
                                />
                            </FoodViewer>
                        </Fragment>
                    ))}
                    
                    {combination.foods.length > 0 && (
                        <>
                            <br />
                            <br />
                            <strong>
                                Totals
                            </strong>
                            <hr />
                            <TabNav
                                onClick={id => setTotalsTab(id)}
                            >
                                <Tab
                                    id='protein'
                                    active={totalsTab === 'protein'}
                                >
                                    Protein
                                </Tab>
                                <Tab
                                    id='vitaoil'
                                    active={totalsTab === 'vitaoil'}
                                >
                                    Vitamins/Acids
                                </Tab>
                                <Tab
                                    id='minerals'
                                    active={totalsTab === 'minerals'}
                                >
                                    Minerals
                                </Tab>

                                <TabContent>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        {totalsTab === 'protein' && (
                                            getTotalsNutrientArray('proteinNutrients').map((nutrient, index) => (
                                                <NutrientViewer
                                                    id={index}
                                                    name={nutrient.name}
                                                    unit={totalsProteinNutrientUnits[index].unit}
                                                    amount={convertUnits(nutrient.amount, nutrient.unit, totalsProteinNutrientUnits[index].unit)}
                                                    onUnitChange={(id, value) => setTotalsProteinNutrientUnits(totalsProteinNutrientUnits
                                                        .map((unit, index) => id === index ? { ...unit, unit: value } : unit))}
                                                />
                                            ))
                                        )}

                                        {totalsTab === 'vitaoil' && (
                                            getTotalsNutrientArray('vitaminAndAcidNutrients').map((nutrient, index) => (
                                                <NutrientViewer
                                                    id={index}
                                                    name={nutrient.name}
                                                    unit={totalsVitaminAndAcidNutrientUnits[index].unit}
                                                    amount={convertUnits(nutrient.amount, nutrient.unit, totalsVitaminAndAcidNutrientUnits[index].unit)}
                                                    onUnitChange={(id, value) => setTotalsVitaminAndAcidNutrientUnits(totalsVitaminAndAcidNutrientUnits
                                                        .map((unit, index) => id === index ? { ...unit, unit: value } : unit))}
                                                />
                                            ))
                                        )}

                                        {totalsTab === 'minerals' && (
                                            getTotalsNutrientArray('mineralNutrients').map((nutrient, index) => (
                                                <NutrientViewer
                                                    id={index}
                                                    name={nutrient.name}
                                                    unit={totalsMineralNutrientUnits[index].unit}
                                                    amount={convertUnits(nutrient.amount, nutrient.unit, totalsMineralNutrientUnits[index].unit)}
                                                    onUnitChange={(id, value) => setTotalsMineralNutrientUnits(totalsMineralNutrientUnits
                                                        .map((unit, index) => id === index ? { ...unit, unit: value } : unit))}
                                                />
                                            ))
                                        )}
                                    </div>
                                </TabContent>
                            </TabNav>
                        </>
                    )}
                </TabCardContent>
            </TabCard>
        </>
    )
}