import { useState } from "react";
import TabCard from "../components/TabCard";
import KeywordSearch from "../components/KeywordSearch";
import { apiCall } from '../utils/http';
import Loading from '../components/Loading';
import CreationListItem from '../components/CreationListItem'
import { useAuth } from "../contexts/UserContext";

export default function Browse({}) {
    const [searchResults, setSearchResults] = useState([]);
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

        console.log(terms)

        apiCall('GET', `/creation/search/keyword?keywords=${terms.join()}`, null, authorize())
        .then(response => {
            setError(null);

            if (response.error) {
                setLoading(false);
                setError(response.type);
                return;
            }

            setSearchResults(response);
            setLoading(false);
        })
    }

    return (
        <>
            <KeywordSearch
                placeholderText={'Search Creations by Name or Food'}
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