import { useTabCard } from "../contexts/TabCard";

export default function TabCardTitle({ children }) {
    const { color } = useTabCard();

    return (
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
                borderBottom: `1px solid ${color}`,
                marginTop: '5px',
                marginLeft: '5px',
                width: 'fit-content',
                backgroundColor: color 
            }}
        >
            {children}
        </div>
    )
}