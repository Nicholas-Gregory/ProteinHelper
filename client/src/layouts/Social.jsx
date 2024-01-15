import { useEffect, useState } from "react";
import TabNav from "../components/TabNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Social({}) {
    const location = useLocation();
    const path = location.pathname.split('/');
    const [page, setPage] = useState(path[path.length - 1]);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(path[path.length - 1]);
    }, [location])

    function handleSelect(name) {
        setPage(name);
        navigate(`/social/${name}`);
    }

    return (
        <>
            <TabNav
                tabs={[
                    {
                        name: 'discover',
                        text: 'Discover'
                    },
                    {
                        name: 'following',
                        text: 'Following'
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