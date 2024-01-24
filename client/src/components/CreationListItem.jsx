import { useState } from "react";
import TabNav from "./TabNav";
import TabCard from "./TabCard";
import { Link } from "react-router-dom";
import { foodTotal, getAminosArray } from "../utils/totals";
import FoodListItem from "./FoodListItem";
import { useAuth } from "../contexts/UserContext";
import { convertAmountSameUnit, convertUnitsSameAmount } from "../utils/conversions";
import AminoLevelsViewer from "./AminoLevelsViewer";

export default function CreationListItem({ creation }) {
    const [tab, setTab] = useState('total');
    const [contentWidth, setContentWidth] = useState(0);
    const [totalsTabUnitSelect, setTotalsTabUnitSelect] = useState('g');
    const [levelsTabUnitSelect, setLevelsTabUnitSelect] = useState('g');
    const { user: { creations: userCreations, goals } } = useAuth();

    function useTabWidth(width) {
        setContentWidth(width);
    }

    function handleTabSelect(name) {
        setTab(name);
    }

    function getTotal() {
        return creation.foods.reduce((total, food) =>
            total + convertUnitsSameAmount(food.unit, totalsTabUnitSelect, convertAmountSameUnit(convertUnitsSameAmount('g', food.unit, foodTotal(food.food)), convertUnitsSameAmount('g', food.unit, 100), food.amount))
        , 0)
    }

    return (
        <>
            <TabCard 
                title={creation.name}
                tabLink={`/creations/${
                    userCreations ?
                        userCreations.includes(creation._id) ? 'create' : 'browse'
                    : 'browse'
                }/${creation._id}`}
            >
                <TabNav
                    tabs={[
                        {
                            name: 'total',
                            text: 'Total EAAs'
                        },
                        {
                            name: 'levels',
                            text: 'Individual EAA Levels'
                        },
                        {
                            name: 'foods',
                            text: 'Foods'
                        }
                    ]}
                    active={tab}
                    useWidth={useTabWidth}
                    onSelect={handleTabSelect}
                />
                <div 
                    className="tab-content" 
                    style={{ minWidth: contentWidth }}
                >
                    {tab === 'total' &&
                        <>
                            {getTotal().toFixed(3)}
                            &nbsp;
                            <select
                                value={totalsTabUnitSelect}
                                onChange={e => setTotalsTabUnitSelect(e.target.value)}
                            >
                                <option value={'g'}>g</option>
                                <option value={'oz'}>oz</option>
                                <option value={'lb'}>lb</option>
                            </select>
                            <span
                                style={{ float: 'right' }}
                            >
                                {((convertUnitsSameAmount(totalsTabUnitSelect, 'g', getTotal()) / Object.keys(goals).reduce((total, key) => key !== '_id' ? total + goals[key] : total, 0)) * 100).toFixed(2)}% Daily Goal
                            </span>
                        </>
                    }

                    {tab === 'levels' &&
                        <>
                            Unit: &nbsp;
                            <select
                                value={levelsTabUnitSelect}
                                onChange={e => setLevelsTabUnitSelect(e.target.value)}
                            >
                                <option value={'g'}>g</option>
                                <option value={'oz'}>oz</option>
                                <option value={'lb'}>lb</option>
                            </select>
                            <AminoLevelsViewer
                                aminos={creation.foods
                                .map(food => getAminosArray(food.food))
                                .map((aminoArray, index) => aminoArray
                                    .map(amino => ({
                                        name: amino.name,
                                        unit: levelsTabUnitSelect,
                                        amount: convertUnitsSameAmount(creation.foods[index].unit, levelsTabUnitSelect, convertAmountSameUnit(convertUnitsSameAmount('g', creation.foods[index].unit, amino.amount), convertUnitsSameAmount('g', creation.foods[index].unit, 100), creation.foods[index].amount))
                                    })))
                                .reduce((totals, aminoArray) => totals
                                    .map(amino => ({
                                        name: amino.name,
                                        unit: amino.unit,
                                        amount: totals
                                        .find(secondAmino => secondAmino.name === amino.name)
                                        .amount + aminoArray
                                        .find(secondAmino => secondAmino.name === amino.name)
                                        .amount
                                    }))
                                )}
                            />
                        </>
                    }

                    {tab === 'foods' &&
                        <>
                            {creation.foods.map(food =>
                                <FoodListItem
                                    food={food.food}
                                    defaultAmount={food.amount}
                                    defaultUnit={food.unit}
                                />
                            )}
                        </>
                    }
                </div>

                <p>
                    Created By: &nbsp;
                    <Link to={`/users/${creation.user._id}`}>
                        {creation.user.username}
                    </Link>
                </p>   
            </TabCard>
        </>
    )
}