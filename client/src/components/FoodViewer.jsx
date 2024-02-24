import { useEffect, useState } from "react";
import TabNav from "../contexts/TabNav";
import NutrientViewer from "./NutrientViewer";
import Tab from "./Tab";
import TabContent from "./TabContent";
import TabCard from "../contexts/TabCard";
import { convertAmount, convertUnits } from "../utils/conversions";
import TabCardTitle from "./TabCardTitle";
import TabCardContent from "./TabCardContent";

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

        // unit = amountsAndUnits?.proteinNutrientUnits[food.proteinNutrients.findIndex(nutrient => nutrientId === nutrient._id)];
        unit = amountsAndUnits?.proteinNutrientUnits.find(unit => unit._id === nutrientId);
        if (!unit) {
            unit = amountsAndUnits?.vitaminAndAcidNutrientUnits.find(unit => unit._id === nutrientId);
        }
        if (!unit) {
            unit = amountsAndUnits?.mineralNutrientUnits.find(unit => unit._id === nutrientId);
        }
    
        return unit?.unit;
    }

    function handleNutrientUnitChange(nutrientId, value) {
        onNutrientUnitChange(id, nutrientId, value);
    }

    function getNutrientAmount(nutrient) {
        // return convertUnits(convertAmount(convertUnits(nutrient.amount, 'g', nutrient.unit), convertUnits(100, 'g', amountsAndUnits?.unit), amountsAndUnits?.amount), nutrient.unit, getNutrientUnit(nutrient._id));
        const newNutrientUnit = getNutrientUnit(nutrient._id);
        const amountInOriginalUnit = convertAmount(nutrient.amount, convertUnits(100, 'g', amountsAndUnits?.unit), amountsAndUnits?.amount);

        return convertUnits(amountInOriginalUnit, nutrient.unit, newNutrientUnit);
    }

    return (
        <TabCard color='cadetblue'>
            <TabCardTitle>
                <h5>
                    {food.name}
                </h5>
            </TabCardTitle>
            <TabCardContent>
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
                                            amount={getNutrientAmount(nutrient)}
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
                                            amount={getNutrientAmount(nutrient)}
                                            onUnitChange={handleNutrientUnitChange}
                                        />
                                    ))}
                                </>
                            )}

                            {tab === 'minerals' && (
                                <>
                                    {food.mineralNutrients.map(nutrient => (
                                        <NutrientViewer
                                            id={nutrient._id}
                                            name={nutrient.name}
                                            unit={getNutrientUnit(nutrient._id)}
                                            amount={getNutrientAmount(nutrient)}
                                            onUnitChange={handleNutrientUnitChange}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </TabContent>
                </TabNav>
            </TabCardContent>
        </TabCard>
    )
}