import { useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import { useAuth } from "../contexts/UserContext";

export default function Header({ page }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const path = location.pathname.split('/');

    function handleTopNavSelect(name) {
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
                defaultActiveTabName={path[path.length - 1]}
                onSelect={handleTopNavSelect}
            />
        </>
    )
}