import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import { useEffect } from "react";
import usePageName from "../hooks/usePageName";
import Tab from "../components/Tab";
import { useAuth } from "../contexts/UserContext";
import TabContent from "../components/TabContent";
import useData from "../hooks/useData";

export default function UserPage({}) {
    const { userId } = useParams();
    const { user: loggedInUser, authorize } = useAuth();
    const page = usePageName(2);
    const navigate = useNavigate();
    const { data: user, error } = useData('GET', `/user/${userId}`, null, authorize());

    useEffect(() => {
        if (page === '' || page === undefined) {
            navigate(`/user/${userId}/info`, { replace: true });
        }
    }, [page]);

    return (
        <>
            <TabNav>
                <Tab active={page === 'info'}>
                    <Link to={`/user/${userId}/info`}>
                        {user?.username}'s Info
                    </Link>
                </Tab>
                <Tab active={page === 'combinations'}>
                    <Link to={`/user/${userId}/combinations`}>
                        {user?.username}'s Combinations
                    </Link>
                </Tab>
                
                {loggedInUser.id === userId && (
                    <Tab active={page === 'goals'}>
                        <Link to={`/user/${userId}/goals`}>
                            My Goals
                        </Link>
                    </Tab>
                )}

                <TabContent>
                    <Outlet context={ user }/>
                </TabContent>
            </TabNav>
        </>
    )
}