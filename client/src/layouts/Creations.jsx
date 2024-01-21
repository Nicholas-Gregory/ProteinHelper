import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserContext";

export default function Creations({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const [page, setPage] = useState(path[path.length - 1]);
    const { user: { creations: userCreations } } = useAuth();

    useEffect(() => {
        const creationId = path[path.length - 1];

        switch (creationId) {
            case 'create':
            case 'browse':
                setPage(path[path.length - 1]);
                break;
            default:
                if (userCreations.includes(creationId)) {
                    setPage('create');
                } else {
                    setPage('browse');
                }
        }
    }, [location])

    function handleSelect(name) {
        navigate(`/creations/${name}`);
    }

    return (
        <>
            <br />
            <TabNav
                tabs={[
                    {
                        name: 'create',
                        text: 'Create'
                    },
                    {
                        name: 'browse',
                        text: 'Browse'
                    }
                ]}
                active={page}
                onSelect={handleSelect}
            />
            <div className="tab-content">
                <Outlet />
            </div>
        </>
    )
}