export default function TabContent({ children }) {
    return (
        <div
            style={{
                border: '1px solid black',
                borderTopRightRadius: '5px',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                //min-width
                padding: '5px',
                backgroundColor: 'lightseagreen',
                marginLeft: '5px',
                marginBottom: '5px',
                marginRight: '5px'
            }}
        >
            {children}
        </div>
    )
}