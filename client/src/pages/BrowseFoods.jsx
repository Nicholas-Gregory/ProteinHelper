import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FoodSearch from "../components/FoodSearch";

export default function BrowseFoods({}) {
    function handleSearch(term) {
        
    }

    return (
        <>
            Foods
            <FoodSearch placeholderText={'Search Foods by Name'} />

            <Outlet />
        </>
    )
}