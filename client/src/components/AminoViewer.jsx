import { useAuth } from "../contexts/UserContext";
import { convert } from '../utils/conversions'

export default function AminoViewer({
    name,
    unit,
    amount
}) {
    const { user: { goals } } = useAuth();

    function getPercentDailyGoal() {
        const goal = goals[name.toLowerCase()];

        return convert(unit, 'g', amount) / goal * 100;
    }

    return (
        <>
            <div className="tab-title tab-selected">
                {name}
            </div>
            <div className="tab-content">
                {amount.toFixed(3)}{unit}&emsp;{getPercentDailyGoal().toFixed(3)}% Daily Goal
            </div>
        </>
    )
}