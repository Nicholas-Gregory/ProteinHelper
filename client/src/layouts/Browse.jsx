import { Outlet, useNavigate } from "react-router-dom";
import usePageName from "../hooks/usePageName";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";

export default function Browse({}) {
    const navigate = useNavigate();
    const page = usePageName(2);

    function handleTabClick(id) {
        navigate(`/explore/browse/${id}`);
    }

    return (
        <>
            <h2>
                Browse
            </h2>

            <TabNav onClick={handleTabClick}>
                <Tab
                    id={'search'}
                    active={page === 'search'}
                >
                    Search
                </Tab>
                <Tab
                    id='new'
                    active={page === 'new'}
                >
                    New
                </Tab>
                <Tab
                    id='friends'
                    active={page === 'friends'}
                >
                    Friends
                </Tab>

                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}