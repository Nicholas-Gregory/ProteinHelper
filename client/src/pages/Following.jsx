import { useEffect, useState } from "react";
import CreationList from '../components/CreationList'
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

export default function Following({}) {
    const [feed, setFeed] = useState([]);
    const [error, setError] = useState(null);
    const { authorize } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await apiCall('GET', '/creation?following=true&sort=true', null, authorize());

            setError(null);

            if (response.error) {
                setError(response.type);
                return;
            }

            setFeed(response);
        })();
    }, []);

    return (
        <>
            <CreationList creations={feed} />

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}