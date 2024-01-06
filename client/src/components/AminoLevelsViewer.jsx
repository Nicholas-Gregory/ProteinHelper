import { useState } from "react"
import { Link } from "react-router-dom";

const UNITS = [
    { unit: 'g', factor: 1 },
    { unit: 'oz', factor: 0.035274 },
    { unit: 'lb', factor: 0.00220462 }
]

export default function AminoLevelsViewer({ aminos }) {
    const [unit, setUnit] = useState('g');
    const [amount, setAmount] = useState(100);

    function getAmountNumber(per100g) {
        return amount / 100 * per100g * UNITS
        .find(unitObject => unitObject.unit === unit)
        .factor;
    }

    return (
        <>
            <div className="tab-content">
                <label htmlFor="unit-select">
                    Select desired unit:
                </label>
                <select
                    name='unit-select'
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    {UNITS.map(unitObject =>
                        <option value={unitObject.unit}>{unitObject.unit}</option>    
                    )}
                </select>

                <label htmlFor='amount-input'>
                    Input amount:
                </label>
                <input
                    name='amount-input'
                    type='number'
                    step='0.01'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                {aminos.map(amino =>
                    <div 
                        style={{ cursor: 'default' }}
                    >
                        <div className="tab-title tab-selected">
                            {amino.name}
                        </div>
                        <div className="tab-content">
                            {getAmountNumber(amino.amount).toFixed(3)}{unit}
                        </div>
                    </div>    
                )}
            </div>
        </>
    )
}