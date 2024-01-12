import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { apiCall } from "../utils/http";

export default function User({}) {
    const { user: loggedInUser, authorize } = useAuth();
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [editBioInput, setEditBioInput] = useState('');

    useEffect(() => {
        (async () => {
            const userData = await apiCall('GET', `/user/${userId}`, null, authorize());

            setUser(userData);
            setEditBioInput(userData.bio);
        })();
    }, []);

    return (
        <>
            <div className="tab-title tab-selected">
                {user.username}'s Profile
            </div>
            <div className='tab-content'>
                <strong>
                    About {user.username} <br />
                    {editing ? (
                        <textarea
                            value={editBioInput}
                        />
                    ) : (
                        <p>
                            {user.bio}
                        </p>
                    )}
                </strong>
            </div>

            <br />
            {loggedInUser && loggedInUser.id === userId &&
                <button onClick={() => setEditing(!editing)}>
                    {editing ? 'Save' : 'Edit Profile'}
                </button>
            }
        </>
    )
}