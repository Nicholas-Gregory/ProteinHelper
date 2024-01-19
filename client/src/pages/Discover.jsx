import { useEffect, useState } from "react";
import CreationList from "../components/CreationList";
import { useAuth } from '../contexts/UserContext'

import { apiCall } from '../utils/http'

export default function Discover({}) {
    const [feed, setFeed] = useState([]);
    const [error, setError] = useState(null);
    const { authorize } = useAuth();

    useEffect(() => {
        (async () => {
            const result = await apiCall('GET', '/creation?sort=true', null, authorize());

            setError(null);

            if (result.error) {
                setError(result.type);
                return;
            }

            setFeed(result);
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