import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCall } from "../utils/http";
import { useAuth } from "../contexts/UserContext";

export default function Creation() {
    const [creation, setCreation] = useState();
    const { creationId } = useParams();
    const { user, authorize } = useAuth();

    useEffect(() => {
        (async ()=> {
            setCreation(await apiCall('GET', `/creation/${creationId}`, null, authorize()));
        })();
    }, []);

    return <>{creation && <p>{creation.name}</p>}</>
}