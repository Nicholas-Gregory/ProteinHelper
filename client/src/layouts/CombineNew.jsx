import { useState } from "react";
import { Outlet } from "react-router-dom";
import Creator from "../components/Creator";
import { getNutrientCategory } from "../utils/nutrients";

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
        const { nutrientsArrayName, nutrientIndex, unitsArrayName } = getNutrientCategory(combination.foods[foodId].food, nutrientId);

        setCombination({
            ...combination,
            foods: combination.foods.map((foodObject, index) => (
                foodId === index ? {
                    ...foodObject,
                    [unitsArrayName]: combination.foods[index][unitsArrayName].map((unitObject, index) => index === nutrientIndex ? {
                        ...unitObject,
                        unit: value
                    } : unitObject)
                } : foodObject
            ))
        })
    }

    return (
        <>
            {combination.foods.length > 0 && (
                <Creator
                    combination={combination}
                    onFoodAmountChange={handleFoodAmountChange}
                    onFoodUnitChange={handleFoodUnitChange}
                    onNutrientUnitChange={handleNutrientUnitChange}
                />
            )}

            <br />
            <Outlet context={[combination, setCombination]}/>
        </>
    )
}