import { useState } from "react";

export default function GoalWidget({ 
    id,
    goal,
    onDelete,
    onSave
}) {
    const [nameInput, setNameInput] = useState(goal ? goal.name : '');
    const [amountInput, setAmountInput] = useState(goal ? goal.amount : '');

    async function handleNameInputChange(e) {
        const value = e.target.value;

        setNameInput(value);
    }

    async function handleAmountInputChange(e) {
        const value = e.target.value;

        setAmountInput(value);
    }

    return (
        <div
            style={{
                margin: '5px'
            }}
        >
            <input
                type="text"
                placeholder="Nutrient Name"
                value={nameInput}
                onChange={handleNameInputChange}
                disabled={goal}
            />
            <input
                type="number"
                value={amountInput}
                onChange={handleAmountInputChange}
                disabled={goal}
            />
            {goal ? (
                <button
                    onClick={() => onDelete(id)}
                    style={{ 
                        backgroundColor: 'red'
                    }}
                >
                    X
                </button>
            ) : (
                <button
                    onClick={() => onSave(nameInput, amountInput)}
                    style={{
                        backgroundColor: 'green'
                    }}
                >
                    +
                </button>
            )}
        </div>
    )
}