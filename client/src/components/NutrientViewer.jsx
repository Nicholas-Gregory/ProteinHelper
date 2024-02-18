import TabCard from './TabCard';
import UnitSelect from './UnitSelect';
import { useAuth } from '../contexts/UserContext';
import { convertUnits } from '../utils/conversions';
import { useState } from 'react';
import GoalWidget from './GoalWidget';

export default function NutrientViewer({
    id,
    name,
    unit,
    amount,
    onUnitChange
}) {
    const { user: { goals }, updateGoals } = useAuth();
    const goalNutrient = goals.find(goal => goal.name === name);
    const [setting, setSetting] = useState(false);
    const [newGoal, setNewGoal] = useState({ name });

    async function handleGoalSave(name, amount, unit) {
        await updateGoals([...goals, { name, amount, unit }]);

        setNewGoal({ ...newGoal, amount, unit });
        setSetting(false);
    }

    return (
        <TabCard
            depth={6}
            title={name}
        >
            <span>
                {amount?.toFixed(2)}
                &nbsp;
                <UnitSelect
                    id={id}
                    onChange={(id, value) => onUnitChange(id, value)}
                    unit={unit}
                />
            </span>
            &emsp;
            <span>
                {goalNutrient ? (
                    <>
                        {amount / convertUnits(goalNutrient.amount, goalNutrient.unit, unit) * 100}% of Daily Goal
                    </>
                ) : (
                    <button onClick={() => setSetting(!setting)}>
                        {setting ? (
                            'Cancel'
                        ) : (
                            'Set Goal'
                        )}
                    </button>
                )}
            </span>
            {setting && (
                <>
                    <br />
                    <GoalWidget 
                        goal={newGoal}
                        onSave={handleGoalSave}
                    />
                </>
            )}
        </TabCard>
    )
}