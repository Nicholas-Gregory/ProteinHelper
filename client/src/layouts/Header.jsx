import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthUtils from "./AuthUtils";
import TabNav from "../components/TabNav";

export default function Header({ page }) {
    const navigate = useNavigate();
    const location = useLocation();

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
                        name: 'food',
                        text: 'Foods'
                    },
                    {
                        name: 'creation',
                        text: 'Creations'
                    }
                ]}
                defaultActiveTabName={path[path.length - 1]}
                onSelect={handleTopNavSelect}
            />

            <AuthUtils page={page} />
        </>
    )
}