import { useEffect, useState } from "react";
import TabNav from "../contexts/TabNav";
import NutrientViewer from "./NutrientViewer";
import Tab from "./Tab";
import TabContent from "./TabContent";
import TabCard from "./TabCard";
import { convertAmount, convertUnits } from "../utils/conversions";

export default function FoodViewer({ 
    id,
    food,
    amountsAndUnits,
    onNutrientUnitChange,
    children
}) {
    const [tab, setTab] = useState('protein');

    function handleTabClick(id) {
        setTab(id);
    }

    function getNutrientUnit(nutrientId) {
        let unit;

        unit = amountsAndUnits?.proteinNutrientUnits[food.proteinNutrients.findIndex(nutrient => nutrientId === nutrient._id)];
        if (!unit) {
            unit = amountsAndUnits?.vitaminAndAcidNutrientUnits[food.vitaminAndAcidNutrients.findIndex(nutrient => nutrientId === nutrient._id)];
        }
        if (!unit) {
            unit = amountsAndUnits?.mineralNutrientUnits[food.mineralNutrients.findIndex(nutrient => nutrientId === nutrient._id)];
        }
    
        return unit?.unit;
    }

    function handleNutrientUnitChange(id, value) {

    }

    function convertNutrient(nutrient) {
        console.log(nutrient)
        return {
            ...nutrient,
            amount: convertUnits(convertAmount(convertUnits(nutrient.amount, 'g', nutrient.unit), convertUnits(100, 'g', amountsAndUnits?.unit), amountsAndUnits?.amount), nutrient.unit, getNutrientUnit(nutrient._id))
        }
    }

    return (
        <TabCard 
            depth={5}
            title={food.name}
        >
            {children}

            <br />
            <TabNav onClick={handleTabClick}>
                <Tab
                    active={tab === 'protein'}
                    id={'protein'}
                >
                    Protein
                </Tab>
                <Tab
                    active={tab === 'vitaoil'}
                    id={'vitaoil'}
                >
                    Vitamins/Acids
                </Tab>
                <Tab
                    active={tab === 'minerals'}
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
                        {tab === 'protein' && (
                            <>
                                {food.proteinNutrients.map(nutrient => (
                                    <NutrientViewer
                                        id={nutrient._id}
                                        name={nutrient.name}
                                        unit={getNutrientUnit(nutrient._id)}
                                        amount={nutrient.amount}
                                        onUnitChange={handleNutrientUnitChange}
                                    />
                                ))}
                            </>
                        )}

                        {tab === 'vitaoil' && (
                            <>
                                {food.vitaminAndAcidNutrients.map(nutrient => (
                                    <NutrientViewer
                                        id={nutrient._id}
                                        name={nutrient.name}
                                        unit={getNutrientUnit(nutrient._id)}
                                        amount={nutrient.amount}
                                        onUnitChange={handleNutrientUnitChange}
                                    />
                                ))}
                            </>
                        )}

                        {tab === 'minerals' && (
                            <>
                                {food.mineralNutrients.map(nutrient => (
                                    <NutrientViewer
                                        name={nutrient.name}
                                        unit={getNutrientUnit(nutrient._id)}
                                        amount={nutrient.amount}
                                        onUnitChange={handleNutrientUnitChange}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </TabContent>
            </TabNav>
        </TabCard>
    )
}