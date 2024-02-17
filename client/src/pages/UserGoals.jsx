import GoalWidget from "../components/GoalWidget";
import { useAuth } from "../contexts/UserContext"

export default function UserGoals({}) {
    const { user: { goals } } = useAuth();

    function handleGoalDelete(id) {

    }

    function handleGoalSave(name, amount) {

    }

    return (
        <>
            <h2>
                My Goals
            </h2>

            {goals?.map((goal, index) => (
                <GoalWidget
                    id={index}
                    goal={goal}
                    onDelete={handleGoalDelete}
                />
            ))}
            
            <GoalWidget
                onSave={handleGoalSave}
            />
        </>
    )
}