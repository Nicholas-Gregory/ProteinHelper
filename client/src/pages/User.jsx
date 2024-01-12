import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { apiCall } from "../utils/http";

export default function User({}) {
    const { user: loggedInUser } = useAuth();
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            setUser(await apiCall())
        })();
    }, []);
}