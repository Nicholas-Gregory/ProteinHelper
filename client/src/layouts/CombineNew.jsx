import { useState } from "react";
import { Outlet } from "react-router-dom";
import TabCard from '../components/TabCard';
import FoodViewer from '../components/FoodViewer';
import Combination from "../components/Combination";

export default function CombineNew({}) {
    const [combination, setCombination] = useState({ foods: [] });

    function handleFoodAmountChange(id, value) {
        setCombination({
            ...combination,
            foods: combination.foods.map((food, index) => (
                index === id ? {
                    ...food,
                    amount: value
                } : food
            ))
        })
    }

    function handleFoodUnitChange(id, value) {
        setCombination({
            ...combination,
            foods: combination.foods.map((food, index) => (
                index === id ? {
                    ...food,
                    unit: value
                } : food
            ))
        })
    }

    function handleNutrientUnitChange(foodId, nutrientId, value) {
        setCombination({
            ...combination,
            foods: combination.foods.map((foodObject, index) => (
                foodId === index ? {
                    ...foodObject,
                    nutrientUnits: foodObject.nutrientUnits.map((unit, index) => (
                        index === combination.foods[foodId].food.nutrients.findIndex(nutrient => nutrient._id === nutrientId) ? {
                            ...unit,
                            unit: value
                        } : unit
                    ))
                } : foodObject
            ))
        })
    }

    return (
        <>
            {combination.foods.length > 0 && (
                <Combination
                    combination={combination}
                    onFoodAmountChange={handleFoodAmountChange}
                    onFoodUnitChange={handleFoodUnitChange}
                    onNutrientUnitChange={handleNutrientUnitChange}
                />
            )}

            <Outlet context={[combination, setCombination]}/>
        </>
    )
}