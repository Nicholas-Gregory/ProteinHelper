import AminoLevelsViewer from "./AminoLevelsViewer";

const KEYS = ['histidine',
'isoleucine',
'leucine',
'lysine',
'methionine',
'phenylalanine',
'threonine',
'tryptophan',
'valine'];

export default function CreationViewer({ creation }) {
    function getTotals() {
        return creation.foods.reduce((totalsArray, food) => 
            totalsArray.map(total => ({
                name: total.name,
                amount: total.amount + (food[total
                    .name
                    .substring(0, 1)
                    .toLowerCase() + total.name
                    .substring(1)
                ] || 0)
            })), [
                { name: 'Histidine', amount: 0 },
                { name: 'Isoleucine', amount: 0 },
                { name: 'Leucine', amount: 0 },
                { name: 'Lysine', amount: 0 },
                { name: 'Methionine', amount: 0 },
                { name: 'Phenylalanine', amount: 0 },
                { name: 'Threonine', amount: 0 },
                { name: 'Tryptophan', amount: 0 },
                { name: 'Valine', amount: 0 }
            ]
        )
    }

    return (
        <>
            <div className="tab-title tab-selected">
                {creation.name}
            </div>
            <div className="tab-content">
                <div className="tab-title tab-selected">
                    Individual Foods
                </div>
                <div 
                    className="tab-content"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {creation.foods.map(food =>
                        <div
                            style={{
                                margin: '5px'
                            }}
                        >
                            <div className="tab-title tab-selected">
                                {food.name}
                            </div>
                            <div className="tab-content">
                                Total Protein (per 100g): {Object.keys(food)
                                .filter(key => KEYS.includes(key))
                                .reduce((total, key) => total + food[key], 0)}
                            </div>
                        </div>
                    )}
                </div>
                <div 
                    className="tab-title tab-selected"
                    style={{
                        marginTop: '5px'
                    }}
                >
                    Total EAA Levels
                </div>
                <AminoLevelsViewer aminos={getTotals()} />
            </div>
        </>
    )
}