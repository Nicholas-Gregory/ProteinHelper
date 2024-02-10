import { useState } from "react";
import TabNav from "../contexts/TabNav";
import NutrientViewer from "./NutrientViewer";
import Tab from "./Tab";
import TabContent from "./TabContent";
import TabCard from "./TabCard";

const PROTEIN_NAMES = [
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
];

const VITAOIL_NAMES = [
    'Vitamin B-12',
    'Vitamin B-12, added',
    'Vitamin D (D2 + D3)',
    'PUFA 18:3 n-3 c,c,c (ALA)',
    'PUFA 22:6 n-3 (DHA)',
    'PUFA 20:5 n-3 (EPA)'
];

const MINERALS_NAMES = [
    'Calcium, Ca',
    'Iron, Fe',
    'Zinc, Zn',
    'Iodine'
];

export default function FoodViewer({ 
    food,
    unit,
    amount,
    edit,
    select    
}) {
    const [tab, setTab] = useState('protein');

    function handleTabClick(id) {
        setTab(id);
    }

    return (
        <TabCard 
            depth={5}
            title={food.name}
        >
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
                    Vitamins/Oils
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
                                {food.nutrients
                                .filter(nutrient => (
                                    PROTEIN_NAMES
                                    .includes(nutrient.name)
                                ))
                                .reduce((array, nutrient) => {
                                    if (nutrient.name === 'Protein') {
                                        return [
                                            {
                                                ...nutrient,
                                                name: 'Total Protein'
                                            },
                                            ...array
                                        ];
                                    } else {
                                        return [...array, nutrient];
                                    }
                                }, [])
                                .map(nutrient => (
                                    <NutrientViewer
                                        name={nutrient.name}
                                        unit={nutrient.unit}
                                        amount={nutrient.amount}
                                    />
                                ))}
                            </>
                        )}

                        {tab === 'vitaoil' && (
                            <>
                                {food.nutrients
                                .filter(nutrient => (
                                    VITAOIL_NAMES
                                    .includes(nutrient.name)
                                ))
                                .reduce((result, nutrient, index, array) => {
                                    if (nutrient.name === 'PUFA 22:6 n-3 (DHA)') {
                                        return [
                                            ...result,
                                            {
                                                ...nutrient,
                                                name: 'DHA Omega-3'
                                            }
                                        ];
                                    } else if (nutrient.name === 'PUFA 18:3 n-3 c,c,c (ALA)') {
                                        return [
                                            ...result,
                                            {
                                                ...nutrient,
                                                name: 'ALA Omega-3'
                                            }
                                        ];
                                    } else if (nutrient.name === 'PUFA 20:5 n-3 (EPA)') {
                                        return [
                                            ...result,
                                            {
                                                ...nutrient,
                                                name: 'EPA Omega-3'
                                            }
                                        ];
                                    } else if (nutrient.name === 'Vitamin D (D2 + D3)') {
                                        return [
                                            ...result,
                                            {
                                                ...nutrient,
                                                name: 'Vitamin D'
                                            }
                                        ]    
                                    }  else if (nutrient.name === 'Vitamin B-12' || nutrient.name === 'Vitamin B-12, added') {
                                        const secondValueIndex = array.findLastIndex(element => element.name === 'Vitamin B-12' || element.name === 'Vitamin B-12, added');

                                        if (secondValueIndex === -1) {
                                            return [
                                                ...result,
                                                nutrient
                                            ]
                                        }
                                        
                                        if (secondValueIndex > index) {
                                            return [
                                                ...result,
                                                {
                                                    name: 'Vitamin B-12',
                                                    unit: nutrient.unit,
                                                    amount: nutrient.amount + array[secondValueIndex].amount
                                                }
                                            ]
                                        }

                                        return [...result];
                                    } else {
                                        return [...result, nutrient];
                                    }
                                }, [])
                                .map(nutrient => (
                                    <NutrientViewer
                                        name={nutrient.name}
                                        unit={nutrient.unit}
                                        amount={nutrient.amount}
                                    />
                                ))}
                            </>
                        )}

                        {tab === 'minerals' && (
                            <>
                                {food.nutrients
                                .filter(nutrient => (
                                    MINERALS_NAMES
                                    .includes(nutrient.name)
                                ))
                                .map(nutrient => (
                                    <NutrientViewer
                                        name={nutrient.name}
                                        unit={nutrient.unit}
                                        amount={nutrient.amount}
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