import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function BrowseFoods({}) {
    function handleSearch(term) {
        
    }

    return (
        <>
            Foods

            <Outlet />
        </>
    )
}