import { useSearchParams } from "react-router-dom";

export default function BrowseSearch({}) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            Search Bar here
        </>
    )
}