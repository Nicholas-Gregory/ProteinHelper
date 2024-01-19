import { useEffect, useRef, useState } from "react";

const COLOR = 'cadetblue';

export default function TabCard({
    title,
    children
}) {
    const titleRef = useRef(null);
    const [minContentWidth, setMinContentWidth] = useState(0);

    useEffect(() => {
        setMinContentWidth(titleRef.current.clientWidth);
    }, [title])

    return (
        <>
            <div
                ref={titleRef}
                className="tab-title tab-selected"
                style={{
                    backgroundColor: COLOR,
                    borderBottom: `1px solid ${COLOR}`
                }}
            >
                {title}
            </div>
            <div
                className="tab-content"
                style={{
                    backgroundColor: COLOR,
                    minWidth: minContentWidth
                }}
            >
                {children}
            </div>
        </>
    )
}