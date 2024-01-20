import { useState } from "react";
import TabNav from "./TabNav";
import TabCard from "./TabCard";
import { Link } from "react-router-dom";

export default function CreationListItem({ creation }) {
    const [tab, setTab] = useState('total');
    const [contentWidth, setContentWidth] = useState(0);

    function useTabWidth(width) {
        setContentWidth(width);
    }

    function handleTabSelect(name) {
        setTab(name);
    }

    return (
        <>
            <TabCard title={creation.name}>
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
                            total
                        </>
                    }

                    {tab === 'levels' &&
                        <>
                            levels
                        </>
                    }

                    {tab === 'foods' &&
                        <>
                            foods
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