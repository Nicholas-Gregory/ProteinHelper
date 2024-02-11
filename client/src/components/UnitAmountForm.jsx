import { useState } from "react"
import UnitSelect from "./UnitSelect"

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

            <UnitSelect
                id={id}
                onChange={onUnitChange}
                unit={unit}
            />
        </form>
    )
}