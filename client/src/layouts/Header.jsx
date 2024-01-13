import { useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import { useAuth } from "../contexts/UserContext";
import { useEffect, useState } from "react";

export default function Header({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const { user, authorize } = useAuth();
    const [page, setPage] = useState(path[1]);

    useEffect(() => {
        if (path[1] === 'users') {
            if (user && path[2] === user.id) {
                setPage('profile');
                return;
            }
        }
        setPage(path[1]);
    }, [location]);

    function handleTopNavSelect(name) {
        setPage(name);
        if (name === 'profile') {
            navigate(`/users/${user.id}`);
            return;
        }

        navigate(`/${name}`);
    }

    return (
        <>
            <TabNav
                tabs={[
                    {
                        name: 'home',
                        text: 'Home'
                    },
                    {
                        name: 'foods',
                        text: 'Foods'
                    },
                    {
                        name: 'creations',
                        text: 'Creations'
                    },
                    {
                        name: 'users',
                        text: 'Users'
                    },
                    user ? {
                        name: 'profile',
                        text: 'My Account'
                    } : {
                        name: 'auth',
                        text: 'Login/Signup'
                    }
                ]}
                active={page}
                onSelect={handleTopNavSelect}
            />
        </>
    )
}