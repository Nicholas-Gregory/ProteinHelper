import { useState } from "react";
import TabCard from "./TabCard";
import TabNav from "./TabNav";
import { foodTotal, getAminosArray } from "../utils/totals";
import AminoLevelsViewer from "./AminoLevelsViewer";
import { useAuth } from "../contexts/UserContext";
import { convertAmountSameUnit, convertUnitsSameAmount } from "../utils/conversions";

export default function FoodListItem({ 
    food,
    onSelect
}) {
    const [tab, setTab] = useState('total');
    const [contentWidth, setContentWidth] = useState(0);
    const [amount, setAmount] = useState(100);
    const [unit, setUnit] = useState('g');
    const { user: { goals } } = useAuth();

    function handleTabSelect(name) {
        setTab(name);
    }

    function useTabWidth(width) {
        setContentWidth(width);
    }

    function getAmount() {
        return convertAmountSameUnit(convertUnitsSameAmount('g', unit, foodTotal(food)), convertUnitsSameAmount('g', unit, 100), amount)
    }

    return (
        <>
            <TabCard title={food.name}>
                <p>
                    Per&nbsp;
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step={.01}
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="g">g</option>
                        <option value='oz'>oz</option>
                        <option value='lb'>lb</option>
                    </select>
                </p>
                <TabNav
                    tabs={[
                        {
                            name: 'total',
                            text: 'Total EAAs'
                        },
                        {
                            name: 'levels',
                            text: 'Individual EAA Levels'
                        }
                    ]}
                    active={tab}
                    onSelect={handleTabSelect}
                    useWidth={useTabWidth}
                />

                <div 
                    className="tab-content"
                    style={{minWidth: contentWidth}}
                >
                    {tab === 'total' &&
                        <p>
                            {getAmount().toFixed(3)}{unit}
                            <span style={{ float: 'right'}}>
                                {(getAmount() / convertUnitsSameAmount('g', unit, Object.keys(goals).reduce((total, key) => key !== '_id' ? total + goals[key] : total, 0)) * 100).toFixed(2)}% Total Daily Goal
                            </span>
                        </p>
                    }

                    {tab === 'levels' &&
                        <>
                            <AminoLevelsViewer
                                aminos={getAminosArray(food)
                                .map(amino => ({
                                    name: amino.name,
                                    unit,
                                    amount: convertAmountSameUnit(convertUnitsSameAmount('g', unit, amino.amount), convertUnitsSameAmount('g', unit, 100), amount)
                                }))}
                            />
                        </>
                    }
                </div>

                <br />
                <button
                    onClick={() => onSelect(food._id, unit, amount)}
                >
                    Use This Food
                </button>
            </TabCard>
        </>
    )
}