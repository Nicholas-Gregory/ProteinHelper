export default function UnitSelect({
    id,
    onChange,
    unit
}) {
    return (
        <select
            value={unit}
            onChange={e => onChange(id, e.target.value)}
        >
            <option value={'g'}>g</option>
            <option value={'mg'}>mg</option>
            <option value={'µg'}>µg</option>
            <option value={'oz'}>oz</option>
            <option value={'lb'}>lb</option>
        </select>
    )
}