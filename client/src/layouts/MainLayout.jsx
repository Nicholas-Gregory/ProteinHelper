import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

export default function MainLayout({}) {
    let path = useLocation().pathname;
    let pageName = path.substring(1).split('/')[0];

    return (
        <>
            <Header page={pageName}/>

            <div
                className="tab-content"
                style={{
                    display: 'flex',
                    backgroundColor: 'lightseagreen'
                }}
            >
                <SideNav path={path}/>
                <div>
                    <Outlet />
                </div>
            </div>

            <Footer />
        </>
    )
}