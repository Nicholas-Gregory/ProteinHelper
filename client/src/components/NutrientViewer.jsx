import TabCard from './TabCard';
import UnitSelect from './UnitSelect';

export default function NutrientViewer({
    id,
    name,
    unit,
    amount,
    onUnitChange
}) {
    return (
        <TabCard
            depth={6}
            title={name}
        >
            <span>
                {amount}
                <UnitSelect
                    id={id}
                    onChange={(id, value) => onUnitChange(id, value)}
                    unit={unit}
                />
            </span>
        </TabCard>
    )
}