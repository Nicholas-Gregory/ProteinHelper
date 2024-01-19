import { useEffect, useRef, useState } from "react"

export default function TabNav({ 
    tabs,
    active,
    onSelect,
    useWidth
}) {
    const outerDivRef = useRef(null);

    useEffect(() => {
        if (useWidth) {
            useWidth(outerDivRef.current.clientWidth);
        }
    }, [outerDivRef]);

    function handleClick(e) {
        const name = tabs
        .find(tab => tab.text === e.target.innerText)
        .name;

        onSelect(name);
    }

    return (
        <div ref={outerDivRef}>
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
        </div>
    )
}