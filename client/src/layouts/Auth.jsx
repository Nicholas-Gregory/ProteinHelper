import { Link, Outlet } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import usePageName from "../hooks/usePageName";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";

export default function Auth({}) {
    const page = usePageName(1);

    return (
        <>
            <h1>
                Login/Sign Up
            </h1>

            <TabNav>
                <Tab active={page === 'signup'}>
                    <Link to='/auth/signup'>
                        Sign Up
                    </Link>
                </Tab>
                <Tab active={page === 'login'}>
                    <Link to='/auth/login/'>
                        Log In
                    </Link>
                </Tab>

                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}