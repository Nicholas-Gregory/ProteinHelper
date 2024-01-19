import { useEffect, useState } from "react";

export default function Loading({}) {
    const [dots, setDots] = useState(['.']);

    useEffect(() => {
        const interval = setInterval(() => setDots(prevDots => [...prevDots, '.']), 70);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (dots.length > 4) {
            setDots(['.']);
        }
    }, [dots]);

    return <p>{dots}</p>
}