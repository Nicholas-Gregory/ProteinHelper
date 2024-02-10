import { useState } from "react";
import { Outlet } from "react-router-dom";
import TabCard from '../components/TabCard';
import FoodViewer from '../components/FoodViewer';

export default function CombineNew({}) {
    const [foods, setFoods] = useState([]);

    return (
        <>
            <h3>
                New Combination
            </h3>

            {foods.length > 0 && (
                <TabCard
                    depth={4}
                    title={'Combined Foods'}
                >
                    {foods.map(food => (
                        <FoodViewer
                            food={food}
                        />
                    ))}
                </TabCard>
            )}

            <Outlet context={[foods, setFoods]}/>
        </>
    )
}