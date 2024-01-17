import { useEffect, useState } from "react";
import CreationList from "../components/CreationList";

import { apiCall } from '../utils/http'

export default function Discover({}) {
    const [feed, setFeed] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await apiCall('GET', '/creation?sort=true');

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