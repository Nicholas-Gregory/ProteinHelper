import { useState } from "react"

export default function TabNav({ 
    tabs,
    active,
    onSelect
}) {
    function handleClick(e) {
        const name = tabs
        .find(tab => tab.text === e.target.innerText)
        .name;

        onSelect(name);
    }

    return (
        <>
            {tabs.map(tab =>
                <div
                    key={tab.name}
                    className={`tab-title${active === tab.name ? ' tab-selected' : ''}`}
                    style={{
                        display: 'inline-block',
                        cursor: 'pointer'
                    }}
                    onClick={handleClick}
                >
                    {tab.text}
                </div>
            )}
        </>
    )
}