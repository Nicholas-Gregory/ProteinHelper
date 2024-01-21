import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import TabCard from "../components/TabCard";
import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import Loading from "../components/Loading";

export default function Creation() {
    const { creationId } = useParams();
    const { data: creation, error } = useData('GET', `/creation/${creationId}`, null);
    const [editing, setEditing] = useState(false);
    const { user } = useAuth();

    return (
        <>
            {creation ? (
                <TabCard title={creation.name}>


                    {user.id === creation.user && (
                        <button
                            onClick={() => setEditing(!editing)}
                        >
                            {editing ? (
                                'Save'   
                            ) : (
                                'Edit'
                            )}
                        </button>
                    )}
                </TabCard>
            ) : (
                <Loading />
            )}
        </>
    )
}