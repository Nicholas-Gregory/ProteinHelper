import { Link, Outlet, useNavigate } from "react-router-dom";
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
        }
    }

    return (
        <>
            <TabNav onClick={handleTabClick}>
                <Tab active={page === 'home'}>
                    <Link to='/home'>
                        Home
                    </Link>
                </Tab>
                <Tab active={page === 'explore'}>
                    <Link to='/explore'>
                        Explore
                    </Link>
                </Tab>
                {user.id ? (
                    <Tab active={user.id === userId} id='profile'>
                        <Link>
                            My Account
                        </Link>
                    </Tab>
                ) : (
                    <Tab active={page === 'auth'}>
                        <Link to='/auth'>
                            Login/Signup
                        </Link>
                    </Tab>
                )}
                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}