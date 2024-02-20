import { useState } from "react";
import FoodViewer from "./FoodViewer";
import TabCard from "./TabCard";
import UnitAmountForm from "./UnitAmountForm";
import { convertUnits } from "../utils/conversions";
import UnitSelect from "./UnitSelect";
import TabNav from "../contexts/TabNav";
import TabContent from "./TabContent";
import NutrientViewer from "./NutrientViewer";
import Tab from "./Tab";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

export default function Creator({
    combination,
    onFoodAmountChange,
    onFoodUnitChange,
    onNutrientUnitChange
}) {
    const [totalsProteinNutrientUnits, setTotalsProteinNutrientUnits] = useState(getTotalsNutrientUnitsArray('proteinNutrientUnits'));
    const [totalsVitaminAndAcidNutrientUnits, setTotalsVitaminAndAcidNutrientUnits] = useState(getTotalsNutrientUnitsArray('vitaminAndAcidNutrientUnits'));
    const [totalsMineralNutrientUnits, setTotalsMineralNutrientUnits] = useState(getTotalsNutrientUnitsArray('mineralNutrientUnits'));
    const [totalsTab, setTotalsTab] = useState('protein');
    const [naming, setNaming] = useState(false);
    const [namingInput, setNamingInput] = useState('');
    const [namingError, setNamingError] = useState(null);
    const { user: { id }, authorize } = useAuth();
    const namingBoxWidth = 250;
    const namingBoxHeight = 150;

    function getTotalsNutrientUnitsArray(arrayName) {
        let result = [...combination.foods[0][arrayName]];

        for (let i = 1; i < combination.foods.length; i++) {
            result = [...result, combination.foods[i][arrayName].filter(nutrient => (
                !result.some(secondNutrient => nutrient._id === secondNutrient._id)
            ))];
        }

        return result;
    }

    function getTotalsNutrientArray(arrayName) {
        let result = [...combination.foods[0].food[arrayName]];

        for (let i = 1; i < combination.foods.length; i++) {
            result = result.map(nutrient => {
                return ({
                ...nutrient,
                amount: nutrient.amount + (combination.foods[i].food[arrayName]
                .find(n => n.name === nutrient.name) || { amount: 0 }).amount
            })});
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
            <TabCard
                depth={4}
                title={combination.name || 'New Combination'}
            >
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
                        <button>
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
            </TabCard>
        </>
    )
}