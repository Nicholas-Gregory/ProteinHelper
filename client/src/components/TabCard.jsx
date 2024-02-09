const COLOR = 'cadetblue';

const HEADER_STYLE = {
    marginTop: '7px',
    marginBottom: '10px'
}

export default function TabCard({ 
    depth,    
    title,
    children
}) {
    function getHeader() {
        if (depth === 1) {
            return <h1 style={HEADER_STYLE}>{title}</h1>
        } else if (depth === 2) {
            return <h2 style={HEADER_STYLE}>{title}</h2>
        } else if (depth == 3) {
            return <h3 style={HEADER_STYLE}>{title}</h3>
        } else if (depth === 4) {
            return <h4 style={HEADER_STYLE}>{title}</h4>
        } else if (depth === 5) {
            return <h5 style={HEADER_STYLE}>{title}</h5>
        } else if (depth === 6) {
            return <h6 style={HEADER_STYLE}>{title}</h6>
        }
    }

    return (
        <>
            {(
                <div
                    style={{
                        position: 'relative',
                        top: '1px',
                        paddingTop: '5px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        borderTopRadius: '5px',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        borderTop: '1px solid black',
                        borderLeft: '1px solid black',
                        borderRight: '1px solid black',
                        borderBottom: `1px solid ${COLOR}`,
                        marginTop: '5px',
                        marginLeft: '5px',
                        width: 'fit-content',
                        backgroundColor: COLOR
                    }}
                >
                    {getHeader()}
                </div>
            )}
            <div
                style={{
                    border: '1px solid black',
                    borderTopRightRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px',
                    padding: '5px',
                    backgroundColor: COLOR,
                    marginLeft: '5px',
                    marginBottom: '5px',
                    marginRight: '5px'
                }}
            >
                {children}
            </div>
        </>
    )
}