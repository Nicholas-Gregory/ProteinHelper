import { useState } from "react";
import TabCard from "./TabCard";
import TabNav from "./TabNav";
import { foodTotal, getAminosArray } from "../utils/totals";
import AminoLevelsViewer from "./AminoLevelsViewer";

export default function FoodListItem({ 
    food,
    onSelect
}) {
    const [tab, setTab] = useState('total');
    const [contentWidth, setContentWidth] = useState(0);

    function handleTabSelect(name) {
        setTab(name);
    }

    function useTabWidth(width) {
        setContentWidth(width);
    }

    return (
        <>
            <TabCard title={food.name}>
                <p>
                    (levels per 100g)
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
                            {foodTotal(food).toFixed(3)}g
                        </p>
                    }

                    {tab === 'levels' &&
                        <>
                            <AminoLevelsViewer
                                aminos={getAminosArray(food)}
                            />
                        </>
                    }
                </div>

                <br />
                <button
                    onClick={() => onSelect(food._id)}
                >
                    Use This Food
                </button>
            </TabCard>
        </>
    )
}