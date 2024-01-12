import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import TabNav from "../components/TabNav";
import { useEffect, useState } from "react";

export default function Creations({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const [page, setPage] = useState(path[path.length - 1]);

    useEffect(() => {
        setPage(path[path.length - 1]);
    }, [location])

    function handleSelect(name) {
        navigate(`/creations/${name}`);
    }

    return (
        <>
            Creations

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