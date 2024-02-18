import { useState } from "react";
import GoalWidget from "../components/GoalWidget";
import { useAuth } from "../contexts/UserContext"

export default function UserGoals({}) {
    const { user: { goals }, updateGoals } = useAuth();
    const [message, setMessage] = useState('');

    async function handleGoalDelete(id) {
        await updateGoals(goals.filter(goal => goal._id !== id));
    }

    async function handleGoalSave(name, amount, unit) {
        setMessage('');

        if (goals.find(goal => goal.name === name)) {
            setMessage('Cannot set more than one goal for the same nutrient.');

            return;
        }

        await updateGoals([...goals, { name, amount, unit }]);
    }

    return (
        <>
            <h2>
                My Goals
            </h2>

            {goals?.map(goal => (
                <div
                    key={goal._id}
                    style={{ margin: '5px' }}
                >
                    <GoalWidget
                        goal={goal}
                        onDelete={handleGoalDelete}
                    />
                </div>
            ))}

            <GoalWidget
                onSave={handleGoalSave}
            />

            {message && (
                <p>
                    {message}
                </p>
            )}
        </>
    )
}