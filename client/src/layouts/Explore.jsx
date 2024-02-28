import { Link, Outlet, useNavigate } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import TabContent from "../components/TabContent";
import Tab from "../components/Tab";
import usePageName from "../hooks/usePageName";

export default function Explore({}) {
    const navigate = useNavigate();
    const page = usePageName(1);

    return (
        <>
            <h1>
                Explore Foods
            </h1>

            <TabNav>
                <Tab 
                    id='combine'
                    active={page === 'combine'}
                >
                    <Link to='/explore/combine'>Combine</Link>
                </Tab>
                <Tab 
                    id='browse'
                    active={page === 'browse'}
                >
                    <Link to='/explore/browse'>Browse</Link>
                </Tab>
                <TabContent>
                    <Outlet />
                </TabContent>
            </TabNav>
        </>
    )
}