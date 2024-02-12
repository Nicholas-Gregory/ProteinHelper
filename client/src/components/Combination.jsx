import FoodViewer from "./FoodViewer";
import TabCard from "./TabCard";
import UnitAmountForm from "./UnitAmountForm";

export default function Combination({
    combination,
    onFoodAmountChange,
    onFoodUnitChange,
    onNutrientUnitChange
}) {
    return (
        <>
            <TabCard
                depth={4}
                title={combination.name || 'New Combination'}
            >
                <button>
                    Edit Name
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
                            nutrientUnits: food.nutrientUnits
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
            </TabCard>
        </>
    )
}