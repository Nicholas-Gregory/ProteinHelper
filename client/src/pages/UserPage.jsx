import { Outlet, useNavigate, useParams } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import { useEffect, useState } from "react";
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
    const { data: user, error } = useData('GET', `/user/${userId}`, null, authorize())

    useEffect(() => {
        if (page === undefined) {
            navigate(`/user/${userId}/info`);
        }
    })

    return (
        <>
            <TabNav onClick={id => navigate(`/user/${userId}/${id}`)}>
                <Tab
                    id='info'
                    active={page === 'info'}
                >
                    {user?.username}'s Info
                </Tab>
                <Tab
                    id='combinations'
                    active={page === 'combinations'}
                >
                    {user?.username}'s Combinations
                </Tab>
                
                {loggedInUser.id === userId && (
                    <Tab
                        id='goals'
                        active={page === 'goals'}
                    >
                        My Goals
                    </Tab>
                )}

                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}