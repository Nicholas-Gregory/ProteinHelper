import { Link, Outlet } from "react-router-dom";
import usePageName from "../hooks/usePageName";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";

export default function Browse({}) {
    const page = usePageName(2);

    return (
        <>
            <h2>
                Browse
            </h2>

            <TabNav>
                <Tab active={page === 'search'}>
                    <Link to='/explore/browse/search'>
                        Search
                    </Link>
                </Tab>
                <Tab active={page === 'new'}>
                    <Link to='/explore/browse/new'>
                        New
                    </Link>
                </Tab>
                <Tab active={page === 'friends'}>
                    <Link to='/explore/browse/friends'>
                        Friends
                    </Link>
                </Tab>

                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}