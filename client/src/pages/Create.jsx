import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { apiCall } from "../utils/http";

export default function Create({}) {
    const { creationId } = useParams();
    const [creation, setCreation] = useState(null);
    const { authorize } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (creationId) {
                const response = await apiCall('GET', `/creation/${creationId}`, null, authorize());
                
                if (response.error) {
                    setError(response.type);
                    return;
                }

                setCreation(response);
            } else {
                setCreation(null);
                navigate('/creations/create/new');
            }
        })();
    }, [creationId]);

    return (
        <>
            <Outlet context={creation}/>
        </>
    )
}