import { useTabCard } from "../contexts/TabCard";

export default function TabCardContent({ children }) {
    const { color } = useTabCard();

    return (
        <div
            style={{
                border: '1px solid black',
                borderTopRightRadius: '5px',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                padding: '5px',
                backgroundColor: color,
                marginLeft: '5px',
                marginBottom: '5px',
                marginRight: '5px'
            }}
        >
            {children}
        </div>
    )
}