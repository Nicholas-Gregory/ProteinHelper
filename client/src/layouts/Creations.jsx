import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserContext";

export default function Creations({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const [page, setPage] = useState(path[path.length - 1]);

    useEffect(() => {
        if (path.length === 3) {
            setPage(path[path.length - 1]);
        } else {
            setPage(path[path.length - 2]);
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