import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";
import { useEffect, useState } from "react";

export default function Auth({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    const [page, setPage] = useState(path[path.length - 1]);

    useEffect(() => {
        setPage(path[path.length - 1]);
    }, [location])

    function handleSelect(name) {
        setPage(name);
        navigate(`/auth/${name}`);
    }

    return (
        <>
            Login or Sign Up

            <br />
            <TabNav
                tabs={[
                    {
                        name: 'signup',
                        text: 'Create Account'
                    },
                    {
                        name: 'login',
                        text: 'Log In'
                    }
                ]}
                active={page}
                onSelect={handleSelect}
            />
            <div
                className="tab-content"
            >
                <Outlet />
            </div>
        </>
    )
}