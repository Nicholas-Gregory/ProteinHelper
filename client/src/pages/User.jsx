import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { apiCall } from "../utils/http";
import TabNav from '../components/TabNav'

export default function User({}) {
    const { 
        user: loggedInUser, 
        authorize, 
        logout 
    } = useAuth();
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [editBioInput, setEditBioInput] = useState('');
    const [page, setPage] = useState('profile');
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await apiCall('GET', `/user/${userId}`, null, authorize());

            setError(null);

            if (response.error) {
                const type = response.type;
                if (type === 'TokenExpiredError') {
                    setError('Your session has expired.');
                    return
                } else if (type === 'JsonWebTokenError') {
                    setError('You must be logged in to view this resource.')
                    return;
                } else {
                    setError('An error occurred.');
                    return;
                }
            }

            setUser(response);
            setEditBioInput(response.bio);
        })();
    }, []);

    function handleTabSelect(name) {
        setPage(name);
    }

    function userText() {
        return user.username || '';
    }

    function checkUser() {
        return loggedInUser && loggedInUser.id === userId;
    }

    return (
        <>
            {!error && <>
                <TabNav
                    tabs={[
                        {
                            name: 'profile',
                            text: `${userText()}'s Profile`
                        },
                        {
                            name: 'creations',
                            text: `${userText()}'s Creations`
                        }
                    ]}
                    active={page}
                    onSelect={handleTabSelect}
                />
                {page === 'profile' ? (
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
                        {checkUser() &&
                            <button onClick={() => setEditing(!editing)}>
                                {editing ? 'Save' : 'Edit Profile'}
                            </button>
                        }
                    </div>
                ) : (
                    <div className="tab-content">
                        creations
                    </div>
                )}
            </>}

            <br />
            {checkUser() &&
                <button onClick={logout}>
                    Logout
                </button>
            }

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}