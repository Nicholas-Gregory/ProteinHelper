import { Outlet, useNavigate } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import TabContent from "../components/TabContent";
import Tab from "../components/Tab";
import usePageName from "../hooks/usePageName";

export default function Explore({}) {
    const navigate = useNavigate();
    const page = usePageName(1);

    function handleTabClick(id) {
        navigate(`/explore/${id}`);
    }

    return (
        <>
            <h1>
                Explore Foods
            </h1>

            <TabNav onClick={handleTabClick}>
                <Tab 
                    id='combine'
                    active={page === 'combine'}
                >
                    Combine
                </Tab>
                <Tab 
                    id='browse'
                    active={page === 'browse'}
                >
                    Browse
                </Tab>
                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}