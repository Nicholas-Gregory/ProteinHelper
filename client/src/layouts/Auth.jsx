import { Outlet, useNavigate } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import usePageName from "../hooks/usePageName";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";

export default function Auth({}) {
    const navigate = useNavigate();
    const page = usePageName(1);

    function handleTabClick(id) {
        navigate(`/auth/${id}`);
    }

    return (
        <>
            <h1>
                Login/Sign Up
            </h1>

            <TabNav onClick={handleTabClick}>
                <Tab
                    active={page === 'signup'}
                    id='signup'
                >
                    Sign Up
                </Tab>
                <Tab
                    active={page === 'login'}
                    id={'login'}
                >
                    Log In
                </Tab>

                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}