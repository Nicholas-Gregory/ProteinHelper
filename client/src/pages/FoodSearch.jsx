import { useOutletContext, useSearchParams } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import { Fragment, useEffect, useState } from "react";
import TabCard from "../components/TabCard";
import SearchBar from "../components/SearchBar";
import useData from "../hooks/useData";
import FoodViewer from "../components/FoodViewer";
import UnitAmountForm from "../components/UnitAmountForm";

export default function FoodSearch({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTab, setSearchTab] = useState('keyword');
    const { data, error } = useData('GET', `/food/search/named?${searchParams.toString()}`);
    const [combination, setCombination] = useOutletContext();
    const [amountsAndUnits, setAmountsAndUnits] = useState(null);

    useEffect(() => {
        setAmountsAndUnits(data?.map(food => ({
            amount: 100,
            unit: 'g',
            proteinNutrientUnits: food.proteinNutrients.map(nutrient => ({
                unit: nutrient.unit,
                id: nutrient._id
            })),
            vitaminAndAcidNutrientUnits: food.vitaminAndAcidNutrients.map(nutrient => ({
                unit: nutrient.unit,
                id: nutrient._id
            })),
            mineralNutrientUnits: food.mineralNutrients.map(nutrient => ({
                unit: nutrient.unit,
                id: nutrient._id
            }))
        })));
    }, [data]);

    function handleTabClick(id) {
        setSearchTab(id);
    }

    function handleKeywordSearch(keyword) {
        setSearchParams({
            term: keyword
        });
    }

    function handleAmountChange(id, value) {
        setAmountsAndUnits(amountsAndUnits.map((item, index) => index === id ? {
            ...item,
            amount: value
        } : item));
    }

    function handleUnitChange(id, value) {
        setAmountsAndUnits(amountsAndUnits.map((item, index) => index === id ? {
            ...item,
            unit: value
        } : item));
    }

    function handleNutrientUnitChange(foodId, nutrientId, value) {
        setAmountsAndUnits(amountsAndUnits.map((object, index) => (
            index === foodId ? {
                ...object,
                nutrientUnits: object.nutrientUnits.map((unit, index) => (
                    index === data[foodId].nutrients.findIndex(nutrient => nutrient._id === nutrientId) ? {
                        ...unit,
                        unit: value,
                     } : unit
                ))
            } : object
        )));
    }

    function handleCombineButtonClick(food, amountAndUnit) {
        console.log(food);
        setCombination({
            ...combination,
            foods: [...combination.foods, {
                food,
                unit: amountAndUnit.unit,
                amount: amountAndUnit.amount,
                nutrientUnits: food.nutrients.map(nutrient => ({
                    unit: nutrient.unit,
                    id: nutrient._id
                }))
            }]
        })
    }

    return (
        <>
            <TabCard
                depth={4}
                title={"Food Search"}
            >
                <>
                    <TabNav onClick={handleTabClick}>
                        <Tab 
                            id="keyword"
                            active={searchTab === 'keyword'}
                        >
                            By Name
                        </Tab>
                        <Tab 
                            id={'advanced'}
                            active={searchTab === 'advanced'}
                        >
                            Advanced
                        </Tab>

                        <TabContent>
                            {searchTab === 'keyword' && (
                                <SearchBar
                                    placeholderText={'Search Foods'}
                                    onSearch={handleKeywordSearch}
                                />
                            )}

                            {searchTab === 'advanced' && (
                                'advanced'
                            )}
                        </TabContent>
                    </TabNav>
                    
                    {data && amountsAndUnits && data.map((datum, index) => (
                        <Fragment key={datum._id}>
                            <FoodViewer 
                                id={index}
                                food={datum}
                                amountsAndUnits={amountsAndUnits[index]}
                                onNutrientUnitChange={handleNutrientUnitChange}
                            >
                                <button
                                    onClick={() => handleCombineButtonClick(datum, amountsAndUnits[index])}
                                >
                                    Combine With This Food
                                </button>

                                <br />
                                <br />
                                <UnitAmountForm 
                                    id={index}
                                    unit={amountsAndUnits?.length > 0 ? amountsAndUnits[index].unit : 'g'}
                                    amount={amountsAndUnits?.length > 0 ? amountsAndUnits[index].amount : 100}
                                    onAmountChange={handleAmountChange}
                                    onUnitChange={handleUnitChange}
                                />
                            </FoodViewer>
                        </Fragment>
                    ))}

                    {error && (
                        <p>
                            {error}
                        </p>
                    )}
                </>
            </TabCard>
        </>
    )
}