import { Outlet, useParams } from "react-router-dom";
import useData from '../hooks/useData';
import { useAuth } from "../contexts/UserContext";
import TabCard from "../contexts/TabCard";
import TabCardTitle from "../components/TabCardTitle";
import TabCardContent from "../components/TabCardContent";
import FoodViewer from "../components/FoodViewer";
import { useEffect, useState } from "react";

export default function Combination({}) {
    const { authorize } = useAuth();
    const { combinationId } = useParams();
    const { data, error } = useData('GET', `/creation/${combinationId}`, null, authorize());
    const [proteinNutrientUnits, setProteinNutrientUnits] = useState([]);
    const [vitaminAndAcidNutrientUnits, setVitaminAndAcidNutrientUnits] = useState([]);
    const [mineralNutrientUnits, setMineralNutrientUnits] = useState([]);

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
        }
    }, [data]);

    function handleNutrientUnitChange(id, nutrientId, value) {
        let unit;

        const setValue = u => u._id === unit._id ? {
            ...u,
            unit: value
        } : u;

        unit = proteinNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        if (unit) {
            setProteinNutrientUnits(proteinNutrientUnits.map(setValue));
        } else {
            unit = vitaminAndAcidNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        }
        if (unit) {
            setVitaminAndAcidNutrientUnits(vitaminAndAcidNutrientUnits.map(setValue));
        } else {
            unit = mineralNutrientUnits.find(nutrient => nutrient._id === nutrientId);
        }
        if (unit) {
            setMineralNutrientUnits(mineralNutrientUnits.map(setValue));
        }
    }

    return (
        <>
            <TabCard color={'cadetblue'}>
                <TabCardTitle>
                    <h3>
                        {data?.name}
                    </h3>
                </TabCardTitle>

                <TabCardContent>
                    <h4>
                        Foods
                    </h4>
                    <hr />
                    {data?.foods.map(food => (
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
                            <p>
                                Amount: {food.amount}{food.unit}
                            </p>
                        </FoodViewer>
                    ))}
                </TabCardContent>
            </TabCard>
            <Outlet />
        </>
    )
}