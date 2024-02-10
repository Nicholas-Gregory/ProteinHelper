import { useOutletContext, useSearchParams } from "react-router-dom";
import TabNav from "../contexts/TabNav";
import Tab from "../components/Tab";
import TabContent from "../components/TabContent";
import { Fragment, useEffect, useState } from "react";
import TabCard from "../components/TabCard";
import SearchBar from "../components/SearchBar";
import useData from "../hooks/useData";
import FoodViewer from "../components/FoodViewer";
import UnitAmountForm from "../components/UnitAmountForm";

export default function FoodSearch({}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTab, setSearchTab] = useState('keyword');
    const { data, error } = useData('GET', `/food/search/named?${searchParams.toString()}`);
    const [foods, setFoods] = useOutletContext();
    const [amountsAndUnits, setAmountsAndUnits] = useState(null);

    useEffect(() => {
        setAmountsAndUnits(data?.map(food => ({
            amount: 100,
            unit: 'g'
        })));
    }, [data]);

    function handleTabClick(id) {
        setSearchTab(id);
    }

    function handleKeywordSearch(keyword) {
        setSearchParams({
            term: keyword
        });
    }

    function handleAmountChange(id, value) {
        setAmountsAndUnits(amountsAndUnits.map((item, index) => index === id ? {
            ...item,
            amount: value
        } : item));
    }

    function handleUnitChange(id, value) {
        setAmountsAndUnits(amountsAndUnits.map((item, index) => index === id ? {
            ...item,
            unit: value
        } : item));
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
                    
                    {data && data.map((datum, index) => (
                        <Fragment key={datum._id}>
                            <FoodViewer 
                                food={datum} 
                            >
                                <button
                                    onClick={() => setFoods([...foods, datum])}
                                >
                                    Combine With This Food
                                </button>

                                <br />
                                <br />
                                <UnitAmountForm 
                                    id={index}
                                    unit={amountsAndUnits.length > 0 ? amountsAndUnits[index].unit : 'g'}
                                    amount={amountsAndUnits.length > 0 ? amountsAndUnits[index].amount : 100}
                                    onAmountChange={handleAmountChange}
                                    onUnitChange={handleUnitChange}
                                />
                            </FoodViewer>
                        </Fragment>
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