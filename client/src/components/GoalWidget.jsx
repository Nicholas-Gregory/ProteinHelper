import { useState } from "react";
import UnitSelect from './UnitSelect';

export default function GoalWidget({ 
    goal,
    onDelete,
    onSave
}) {
    const [nameInput, setNameInput] = useState(goal ? goal.name : 'Histidine');
    const [amountInput, setAmountInput] = useState(goal ? goal.amount : '');
    const [newGoalUnit, setNewGoalUnit] = useState('g');

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
                className="mar-5"
                value={nameInput}
                onChange={handleNameInputChange}
                disabled={goal.name}
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
                className="mar-5"
                type="number"
                value={amountInput}
                onChange={handleAmountInputChange}
                disabled={goal.amount}
            />
            {goal && (
                <>
                    {goal.unit}
                </>
            )}
            {goal.name && goal.amount ? (
                <button
                    className="mar-5"
                    onClick={() => onDelete(goal._id)}
                    style={{ 
                        backgroundColor: 'red'
                    }}
                >
                    X
                </button>
            ) : (
                <>
                    <UnitSelect onChange={(id, value) => setNewGoalUnit(value)} />
                    <button
                        className="mar-5"
                        onClick={() => onSave(nameInput, amountInput, newGoalUnit)}
                        style={{
                            backgroundColor: 'green'
                        }}
                    >
                        +
                    </button>
                </>
            )}
        </div>
    )
}