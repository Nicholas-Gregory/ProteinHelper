import TabCard from './TabCard';

export default function NutrientViewer({
    name,
    unit,
    amount,
}) {
    return (
        <TabCard
            depth={6}
            title={name}
        >
            <span>
                {amount}{unit}
            </span>
        </TabCard>
    )
}