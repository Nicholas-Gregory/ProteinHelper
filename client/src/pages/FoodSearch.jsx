import { useSearchParams } from "react-router-dom";

export default function FoodSearch({}) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            Search
        </>
    )
}