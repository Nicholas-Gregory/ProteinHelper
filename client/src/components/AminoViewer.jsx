import { useAuth } from "../contexts/UserContext";
import { convertUnitsSameAmount } from '../utils/conversions'
import TabCard from "./TabCard";

export default function AminoViewer({
    name,
    unit,
    amount
}) {
    const { user: { goals } } = useAuth();

    function getPercentDailyGoal() {
        const goal = goals[name.toLowerCase()];

        return convertUnitsSameAmount(unit, 'g', amount) / goal * 100;
    }

    return (
        <>
            <TabCard title={name}>
                {amount.toFixed(3)}{unit}&emsp;{getPercentDailyGoal().toFixed(3)}% Daily Goal
            </TabCard>
        </>
    )
}