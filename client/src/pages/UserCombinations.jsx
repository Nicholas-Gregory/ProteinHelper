import { useOutletContext } from "react-router-dom"
import TabNav from '../contexts/TabNav';
import { useEffect, useState } from "react";
import Tab from "../components/Tab";
import TabCard from '../components/TabCard';
import TabContent from '../components/TabContent';
import NutrientViewer from "../components/NutrientViewer";

export default function UserCombinations({}) {
    const user = useOutletContext();
    const [combinationTabs, setCombinationTabs] = useState([]);

    useEffect(() => {
        if (user) {
            setCombinationTabs(user.creations.map(creation => 'protein'));
        }
    }, [user]);

    function handleTabClick(stateIndex, tabId) {
        setCombinationTabs(combinationTabs.map((tab, index) => (
            stateIndex === index ? tabId : tab
        )));
    }

    function getTotalsElements(combination, nutrientArrayName, nutrientNameArray) {
        return combination.foods.reduce((totals, food) => (
            totals.map(total => (
                {
                    ...total,
                    amount: total.amount + (food.food[nutrientArrayName]
                    .find(nutrient => nutrient.name === total.name) || { amount: 0 })
                    .amount,
                    unit: (food.food[nutrientArrayName]
                    .find(nutrient => nutrient.name === total.name) || { unit: null })
                    .unit
                }
            ))
        ), nutrientNameArray.map(nutrient => ({
            name: nutrient,
            amount: 0
        })))
        .filter(nutrient => nutrient.unit)
        .map((nutrient, index) => (
            <NutrientViewer
                id={index}
                name={nutrient.name}
                unit={nutrient.unit}
                amount={nutrient.amount}
            />
        ));
    }

    return (
        <>
            <h2>
                {user?.username}'s Combinations
            </h2>

            {user?.creations.map((combination, index) => (
                <TabCard 
                    depth={3}
                    title={combination.name}
                >
                    <TabNav onClick={id => handleTabClick(index, id)}>
                        <Tab
                            id='protein'
                            active={combinationTabs[index] === 'protein'}
                        >
                            Protein
                        </Tab>

                        <Tab
                            id='vitaoil'
                            active={combinationTabs[index] === 'vitaoil'}
                        >
                            Vitamins/Acids
                        </Tab>

                        <Tab
                            id='minerals'
                            active={combinationTabs[index] === 'minerals'}
                        >
                            Minerals
                        </Tab>
                    </TabNav>
                    <TabContent>
                        <p>
                            (totals)
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}
                        >
                            {combinationTabs[index] === 'protein' && (
                                getTotalsElements(combination, 'proteinNutrients', [
                                    'Protein',
                                    'Histidine',
                                    'Isoleucine',
                                    'Leucine',
                                    'Lysine',
                                    'Methionine',
                                    'Phenylalanine',
                                    'Threonine',
                                    'Tryptophan',
                                    'Valine'
                                ])
                            )}

                            {combinationTabs[index] === 'vitaoil' && (
                                getTotalsElements(combination, 'vitaminAndAcidNutrients', [
                                    'Vitamin B-12',
                                    'Vitamin D',
                                    'DHA Omega-3',
                                    'ALA Omega-3',
                                    'EPA Omega-3',
                                ])
                            )}

                            {combinationTabs[index] === 'minerals' && (
                                getTotalsElements(combination, 'mineralNutrients', [
                                    'Calcium, Ca',
                                    'Iron, Fe',
                                    'Zinc, Zn',
                                    'Iodine'
                                ])
                            )}
                        </div>
                    </TabContent>
                </TabCard>
            ))}
        </>
    )
}