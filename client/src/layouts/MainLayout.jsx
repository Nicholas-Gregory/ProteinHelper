import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useAuth } from "../contexts/UserContext";

export default function MainLayout({}) {
    return (
        <>
            <Header />

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