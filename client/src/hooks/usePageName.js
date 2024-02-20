import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePageName(depth) {
    const location = useLocation();
    const pathArray = location
    .pathname
    .split('/')
    .slice(1);

    const [page, setPage] = useState(pathArray[depth]);

    useEffect(() => {
        setPage(pathArray[depth]);
    }, [location]);

    return page;
}