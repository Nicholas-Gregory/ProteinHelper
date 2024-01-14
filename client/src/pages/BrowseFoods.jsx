import { Outlet, useNavigate } from "react-router-dom";
import FoodList from '../components/FoodList'
import FoodSearch from "../components/FoodSearch";
import { useState } from "react";
import { apiCall } from '../utils/http'
import { useAuth } from "../contexts/UserContext";

export default function BrowseFoods({}) {
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { authorize } = useAuth();

    async function handleNamedSearch(term) {
        const response = await apiCall('GET', `/food/search/named?term=${term}`, null, authorize());

        setError(null);

        if (response.error) {
            if (response.type == 'JsonWebTokenError') {
                setError('You must be logged in to view this resource.');
            } else if (response.type === 'TokenExpiredError') {
                setError('Your session has expired.')
            } else {
                setError('There was an error processing your response.')
            }

            setSearchResults(null);

            return;
        }

        setSearchResults(response);
    }

    async function handleAdvancedSearch(options, name) {
        const response = await apiCall('POST', `/food/search/advanced${name ? `?name=${name}` : ''}`, options, authorize());

        setError(null);

        if (response.error) {
            setError('There was an error processing your request');

            setSearchResults(null);

            return;
        }

        setSearchResults(response);
    }

    function handleFoodSelect(id) {
        navigate(`/foods/${id}`);
    }

    return (
        <>
            Foods
            <FoodSearch 
                placeholderText={'Search Foods by Name'} 
                onNamedSearch={handleNamedSearch}
                onAdvancedSearch={handleAdvancedSearch}
            />

            <Outlet />

            <br />
            {searchResults &&
                <FoodList
                    foods={searchResults}
                    onSelect={handleFoodSelect}
                />
            }

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}