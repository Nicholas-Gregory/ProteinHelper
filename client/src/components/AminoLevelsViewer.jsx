export default function AminoLevelsViewer({ aminos }) {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {aminos.map(amino =>
                    <div
                        style={{
                            margin: '3px'
                        }}
                    >
                        <div 
                            style={{ cursor: 'default' }}
                        >
                            <div className="tab-title tab-selected">
                                {amino.name}
                            </div>
                            <div className="tab-content">
                                {amino.amount.toFixed(3)}{amino.unit}
                            </div>
                        </div>    
                    </div>
                )}
            </div>
        </>
    )
}