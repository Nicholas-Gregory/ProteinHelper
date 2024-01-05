import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

export default function MainLayout({}) {
    let pageName = useLocation().pathname.substring(1);

    return (
        <>
            <Header page={pageName}/>

            <div
                style={{
                    display: 'flex',
                }}
            >
                <SideNav page={pageName}/>
                <div>
                    <Outlet />
                </div>
            </div>

            <Footer />
        </>
    )
}