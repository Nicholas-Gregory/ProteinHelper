import { Outlet, useParams } from "react-router-dom";
import useData from '../hooks/useData';
import { useAuth } from "../contexts/UserContext";
import TabCard from "../contexts/TabCard";
import TabCardTitle from "../components/TabCardTitle";
import TabCardContent from "../components/TabCardContent";
import FoodViewer from "../components/FoodViewer";
import { useEffect, useState } from "react";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import { NUTRIENT_NAMES } from "../utils/nutrients";
import { convertAmount, convertUnits } from "../utils/conversions";
import NutrientViewer from "../components/NutrientViewer";
import UnitAmountForm from "../components/UnitAmountForm";
import { apiCall } from "../utils/http";

export default function Combination({}) {
    const { authorize, user: { id: userId } } = useAuth();
    const { combinationId } = useParams();
    const { data, error, reload } = useData('GET', `/creation/${combinationId}`, null, authorize());
    const [proteinNutrientUnits, setProteinNutrientUnits] = useState([]);
    const [vitaminAndAcidNutrientUnits, setVitaminAndAcidNutrientUnits] = useState([]);
    const [mineralNutrientUnits, setMineralNutrientUnits] = useState([]);
    const [totalsTab, setTotalsTab] = useState('protein');
    const [totalsProtein, setTotalsProtein] = useState([]);
    const [totalsVitaminAcid, setTotalsVitaminAcid] = useState([]);
    const [totalsMineral, setTotalsMineral] = useState([]);
    const [totalsUnits, setTotalsUnits] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingFoodUnitsAndAmounts, setEditingFoodUnitsAndAmounts] = useState([]);
    const [editingName, setEditingName] = useState('');
    const [saveError, setSaveError] = useState(null);

    useEffect(() => {
        if (data) {
            for (let food of data.foods) {
                for (let nutrient of food.food.proteinNutrients) {
                    setProteinNutrientUnits(units => [...units, {
                        _id: nutrient._id,
                        unit: nutrient.unit
                    }]);
                }

                for (let nutrient of food.food.vitaminAndAcidNutrients) {
                    setVitaminAndAcidNutrientUnits(units => [...units, {
                        _id: nutrient._id,
                        unit: nutrient.unit
                    }]);
                }

                for (let nutrient of food.food.mineralNutrients) {
                    setMineralNutrientUnits(units => [...units, {
                        _id: nutrient._id,
                        unit: nutrient.unit
                    }]);
                }
            }

            const protein = sumNutrients('proteinNutrients');
            const vitacid = sumNutrients('vitaminAndAcidNutrients');
            const mineral = sumNutrients('mineralNutrients')

            setTotalsProtein(protein);
            setTotalsVitaminAcid(vitacid);
            setTotalsMineral(mineral);

            setTotalsUnits([
                ...protein.map(({ id, unit }) => ({ id, unit })),
                ...vitacid.map(({ id, unit }) => ({ id, unit })),
                ...mineral.map(({ id, unit }) => ({ id, unit }))
            ]);

            setEditingFoodUnitsAndAmounts(data.foods.map(({ unit, amount, food }) => ({ unit, amount, food })))
            setEditingName(data.name);
        }
    }, [data]);

    function sumNutrients(nutrientArrayName) {
        let names;

        if (nutrientArrayName === 'proteinNutrients') {
            names = NUTRIENT_NAMES.PROTEIN;
        } else if (nutrientArrayName === 'vitaminAndAcidNutrients') {
            names = NUTRIENT_NAMES.VITAMIN_ACID
        } else if (nutrientArrayName === 'mineralNutrients') {
            names = NUTRIENT_NAMES.MINERAL
        }

        return data.foods
        .reduce((totals, food) => (
            totals.map(total => {
                const nutrient = food.food[nutrientArrayName]
                .find(nutrient => nutrient.name === total.name);

                if (!nutrient) {
                    return total;
                }

                return {
                    ...total,
                    amount: total.amount + convertAmount(nutrient.amount, convertUnits(100, 'g', food.unit), food.amount),
                    unit: nutrient.unit,
                    id: nutrient._id
                }
            })), names.map(name => ({
                name,
                amount: 0
            }))
        )
        .filter(total => total.amount > 0)
    }

    function handleNutrientUnitChange(id, nutrientId, value) {
        let unit;

        const setValue = u => u._id === unit._id ? {
            ...u,
            unit: value
        } : u;

        unit = proteinNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        if (unit) {
            setProteinNutrientUnits(proteinNutrientUnits.map(setValue));
            return;
        } else {
            unit = vitaminAndAcidNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        }
        if (unit) {
            setVitaminAndAcidNutrientUnits(vitaminAndAcidNutrientUnits.map(setValue));
            return;
        } else {
            unit = mineralNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        }
        if (unit) {
            setMineralNutrientUnits(mineralNutrientUnits.map(setValue));
            return;
        }
    }

    function getTotalsUnit(nutrientId) {
        return totalsUnits.find(unit => unit.id === nutrientId).unit;
    }

    function setTotalsUnit(nutrientId, value) {
        setTotalsUnits(units => units.map(unit => unit.id === nutrientId ? { ...unit, unit: value } : unit))
    }

    function handleFoodAmountChange(id, value) {
        setEditingFoodUnitsAndAmounts(editingFoodUnitsAndAmounts.map((food, index) => (
            index === id ? (
                {
                    ...food,
                    amount: value
                }
            ) : (
                food
            )
        )));
    }

    function handleFoodUnitChange(id, value) {
        setEditingFoodUnitsAndAmounts(editingFoodUnitsAndAmounts.map((food, index) => (
            index === id ? (
                {
                    ...food,
                    unit: value
                }
            ) : (
                food
            )
        )));
    }

    async function handleSaveClick() {
        const response = await apiCall('PUT', `/creation/${combinationId}`, {
            name: editingName,
            foods: editingFoodUnitsAndAmounts
        },  authorize());

        if (response.error) {
            setSaveError(response.type);
            return;
        }

        setEditing(false);
        await reload();
    }

    return (
        <>
            {saveError && (
                <p>
                    {saveError}
                </p>
            )}
            <TabCard color={'cadetblue'}>
                <TabCardTitle>
                    {editing ? (
                        <input
                            type="text"
                            placeholder="Combination Name"
                            value={editingName}
                            onChange={e => setEditingName(e.target.value)}
                        />
                    ) : (
                        <h3>
                            {data?.name}
                        </h3>
                    )}
                </TabCardTitle>

                <TabCardContent>
                    {userId === data?.user && (
                        <>
                            {editing ? (
                                <button onClick={handleSaveClick}>
                                    Save
                                </button>
                            ) : (
                                <button onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                            )}
                        </>
                    )}

                    <h4>
                        Foods
                    </h4>
                    <hr />
                    {data?.foods.map((food, index) => (
                        <FoodViewer
                            food={food.food}
                            amountsAndUnits={{
                                amount: food.amount,
                                unit: food.unit,
                                proteinNutrientUnits,
                                vitaminAndAcidNutrientUnits,
                                mineralNutrientUnits
                            }}
                            onNutrientUnitChange={handleNutrientUnitChange}
                        >
                            {editing ? (
                                <>
                                    <br />
                                    <br />
                                    <UnitAmountForm
                                        id={index}
                                        unit={editingFoodUnitsAndAmounts[index].unit}
                                        amount={editingFoodUnitsAndAmounts[index].amount}
                                        onAmountChange={(id, value) => handleFoodAmountChange(id, value)}
                                        onUnitChange={(id, value) => handleFoodUnitChange(id, value)}
                                    />
                                </>
                            ) : (
                                <p>
                                    Amount: {food.amount}{food.unit}
                                </p>
                            )}
                        </FoodViewer>
                    ))}

                    <h4>
                        Totals
                    </h4>
                    <hr />
                    <TabNav onClick={id => setTotalsTab(id)}>
                        <Tab
                            active={totalsTab === 'protein'}
                            id={'protein'}
                        >
                            Protein
                        </Tab>
                        <Tab
                            active={totalsTab === 'vitacid'}
                            id={'vitacid'}
                        >
                            Vitamins/Acids
                        </Tab>
                        <Tab
                            active={totalsTab === 'minerals'}
                            id={'minerals'}
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
                                    <>                                
                                        {totalsProtein.map(nutrient => (
                                            <NutrientViewer
                                                name={nutrient.name}
                                                amount={convertUnits(nutrient.amount, nutrient.unit, getTotalsUnit(nutrient.id))}
                                                unit={getTotalsUnit(nutrient.id)}
                                                onUnitChange={(id, value) => setTotalsUnit(nutrient.id, value)}
                                            />
                                        ))}
                                    </>
                                )}

                                {totalsTab === 'vitacid' && (
                                    <>
                                        {totalsVitaminAcid.map(nutrient => (
                                            <NutrientViewer
                                                name={nutrient.name}
                                                amount={convertUnits(nutrient.amount, nutrient.unit, getTotalsUnit(nutrient.id))}
                                                unit={getTotalsUnit(nutrient.id)}
                                                onUnitChange={(id, value) => setTotalsUnit(nutrient.id, value)}
                                            />
                                        ))}
                                    </>
                                )}

                                {totalsTab === 'minerals' && (
                                    <>
                                        {totalsMineral.map(nutrient => (
                                            <NutrientViewer
                                                name={nutrient.name}
                                                amount={convertUnits(nutrient.amount, nutrient.unit, getTotalsUnit(nutrient.id))}
                                                unit={getTotalsUnit(nutrient.id)}
                                                onUnitChange={(id, value) => setTotalsUnit(nutrient.id, value)}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        </TabContent>
                    </TabNav>
                </TabCardContent>
            </TabCard>

            <Outlet />
        </>
    )
}