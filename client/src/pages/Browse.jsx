import { useState } from "react";
import TabCard from "../components/TabCard";
import { apiCall } from '../utils/http';
import Loading from '../components/Loading';
import CreationListItem from '../components/CreationListItem'
import { useAuth } from "../contexts/UserContext";
import KeywordSearch from "../components/KeywordSearch";

export default function Browse({}) {
    const [searchResults, setSearchResults] = useState([]);
    const [nameCheckbox, setNameCheckbox] = useState(true);
    const [foodCheckbox, setFoodCheckbox] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    
    const { authorize } = useAuth();

    function handleKeywordsChange(terms) {
        if (terms.length === 0) {
            setSearchResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        apiCall('GET', `/creation/search/keyword?name=${nameCheckbox}&food=${foodCheckbox}&keywords=${terms.join()}`, null, authorize())
        .then(response => {
            setError(null);

            if (response.error) {
                setLoading(false);
                setError(response.type);
                return;
            }

            setSearchResults(response);
            setLoading(false);
        });
    }

    return (
        <>
            <div>
                <input
                    id="name-checkbox"
                    type="checkbox"
                    checked={nameCheckbox}
                    onChange={e => setNameCheckbox(e.target.checked)}
                />
                <label htmlFor="name-checkbox">
                    Search by Creation Name
                </label>
            </div>
            <div>
                <input
                    id="food-checkbox"
                    type="checkbox"
                    checked={foodCheckbox}
                    onChange={e => setFoodCheckbox(e.target.checked)}
                />
                <label htmlFor="food-checkbox">
                    Search by Food Name
                </label>
            </div>
            
            <KeywordSearch
                placeholderText={'Search Creations by Name'}
                onKeywordsChange={handleKeywordsChange}
            />

            {(loading || searchResults.length > 0) && (
                <TabCard title={'Search Results'}>
                    {loading && <Loading />}

                    {searchResults.map(result => (
                        <>
                            <CreationListItem creation={result} />
                        </>
                    ))}
                </TabCard>
            )}

            {error && (
                <p>
                    {error}
                </p>
            )}
        </>
    )
}