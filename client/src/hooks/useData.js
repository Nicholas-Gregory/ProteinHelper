import { useEffect, useState } from "react";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

export default function useData(method, route, body) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { authorize } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await apiCall(method, route, body, authorize());

            if (response.error) {
                setError(response.type);
            } else {
                setData(response);
            }
        })();
    }, [method, route, body]);

    return { data, error };
}