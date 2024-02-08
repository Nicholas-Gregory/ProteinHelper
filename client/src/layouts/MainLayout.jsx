import { Outlet, useNavigate } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import { useAuth } from "../contexts/UserContext";
import TabContent from "../components/TabContent";
import usePageName from "../hooks/usePageName";

export default function MainLayout({}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const page = usePageName(0);
    const userId = usePageName(1);

    function handleTabClick(id) {
        if (id === 'profile') {
            navigate(`/user/${user.id}`);
        } else {
            navigate(`/${id}`);
        }
    }

    return (
        <>
            <TabNav onClick={handleTabClick}>
                <Tab active={page === 'home'} id='home'>Home</Tab>
                <Tab active={page === 'explore'} id='explore'>Explore Foods</Tab>
                {user.id ? (
                    <Tab active={user.id === userId} id='profile'>My Account</Tab>
                ) : (
                    <Tab active={page === 'auth'} id='auth'>Login/Signup</Tab>
                )}
                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}