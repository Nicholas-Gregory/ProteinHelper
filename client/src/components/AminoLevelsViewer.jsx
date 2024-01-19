import AminoViewer from "./AminoViewer";

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
                            <AminoViewer
                                name={amino.name}
                                unit={amino.unit}
                                amount={amino.amount}
                            />
                        </div>    
                    </div>
                )}
            </div>
        </>
    )
}