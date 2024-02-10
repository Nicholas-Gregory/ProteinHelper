import { useSearchParams } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import { useEffect, useState } from "react";
import TabCard from "../components/TabCard";
import SearchBar from "../components/SearchBar";
import useData from "../hooks/useData";
import FoodViewer from "../components/FoodViewer";

export default function FoodSearch({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTab, setSearchTab] = useState('keyword');
    const { data, error } = useData('GET', `/food/search/named?${searchParams.toString()}`);

    function handleTabClick(id) {
        setSearchTab(id);
    }

    function handleKeywordSearch(keyword) {
        setSearchParams({
            term: keyword
        });
    }

    return (
        <>
            <TabCard
                depth={4}
                title={"Food Search"}
            >
                <>
                    <TabNav onClick={handleTabClick}>
                        <Tab 
                            id="keyword"
                            active={searchTab === 'keyword'}
                        >
                            By Name
                        </Tab>
                        <Tab 
                            id={'advanced'}
                            active={searchTab === 'advanced'}
                        >
                            Advanced
                        </Tab>

                        <TabContent>
                            {searchTab === 'keyword' && (
                                <SearchBar
                                    placeholderText={'Search Foods'}
                                    onSearch={handleKeywordSearch}
                                />
                            )}

                            {searchTab === 'advanced' && (
                                'advanced'
                            )}
                        </TabContent>
                    </TabNav>
                    
                    {data?.map(datum => (
                        <FoodViewer food={datum} />
                    ))}

                    {error && (
                        <p>
                            {error}
                        </p>
                    )}
                </>
            </TabCard>
        </>
    )
}