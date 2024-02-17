import { useState } from "react";

export default function GoalWidget({ 
    goal,
    onDelete,
    onSave
}) {
    const [nameInput, setNameInput] = useState(goal ? goal.name : 'Histidine');
    const [amountInput, setAmountInput] = useState(goal ? goal.amount : '');

    function handleNameInputChange(e) {
        const value = e.target.value;

        setNameInput(value);
    }

    function handleAmountInputChange(e) {
        const value = e.target.value;

        setAmountInput(value);
    }

    return (
        <div>
            <select
                value={nameInput}
                onChange={handleNameInputChange}
                disabled={goal}
            >
                <option value='Histidine'>Histidine</option>
                <option value='Isoleucine'>Isoleucine</option>
                <option value='Leucine'>Leucine</option>
                <option value='Lysine'>Lysine</option>
                <option value='Methionine'>Methionine</option>
                <option value='Phenylalanine'>Phenylalanine</option>
                <option value='Threonine'>Threonine</option>
                <option value='Tryptophan'>Tryptophan</option>
                <option value='Valine'>Valine</option>
                <option value='Total Protein'>Total Protein</option>
                <option value='DHA Omega-3'>DHA Omega-3</option>
                <option value='ALA Omega-3'>ALA Omega-3</option>
                <option value='EPA Omega-3'>EPA Omega-3</option>
                <option value='Vitamin D'>Vitamin D</option>
                <option value='Vitamin B-12'>Vitamin B-12</option>
                <option value='Calcium, Ca'>Calcium, Ca</option>
                <option value='Iron, Fe'>Iron, Fe</option>
                <option value='Zinc, Zn'>Zinc, Zn</option>
                <option value='Iodine'>Iodine</option>
            </select>
            <input
                type="number"
                value={amountInput}
                onChange={handleAmountInputChange}
                disabled={goal}
            />
            {goal ? (
                <button
                    onClick={() => onDelete(goal._id)}
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