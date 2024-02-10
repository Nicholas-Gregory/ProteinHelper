import { useState } from "react"

export default function UnitAmountForm({ 
    id,
    onAmountChange,
    onUnitChange,
    unit,
    amount
}) {
    return (
        <form>
            <span>Per: &nbsp;</span>
            <input
                type="number"
                step={0.01}
                value={amount}
                onChange={e => onAmountChange(id, e.target.value)}
            />

            <select
                value={unit}
                onChange={e => onUnitChange(id, e.target.value)}
            >
                <option value={'g'}>g</option>
                <option value={'mg'}>mg</option>
                <option value={'µg'}>µg</option>
                <option value={'oz'}>oz</option>
                <option value={'lb'}>lb</option>
            </select>
        </form>
    )
}