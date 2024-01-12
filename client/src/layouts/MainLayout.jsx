import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

export default function MainLayout({}) {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;
    const pageName = path.substring(1).split('/')[0];

    useEffect(() => {
        if (path === '/') navigate('/home');
    }, [])

    return (
        <>
            <Header page={pageName}/>

            <div
                className="tab-content"
                style={{
                    display: 'flex',
                    backgroundColor: 'lightseagreen',
                    width: '100%'
                }}
            >
                <div>
                    <Outlet />
                </div>
            </div>

            <Footer />
        </>
    )
}