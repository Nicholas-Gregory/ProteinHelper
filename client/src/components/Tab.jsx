import { useTabNav } from "../contexts/TabNav"

export default function Tab({ 
    active, 
    id,
    children 
}) {
    const { onClick } = useTabNav();

    return (
        <span 
            style={{
                display: 'inline-block',
                position: 'relative',
                paddingTop: '5px',
                paddingLeft: '5px',
                paddingRight: '5px',
                borderTopRadius: '5px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                borderTop: '1px solid black',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
                borderBottom: '1px solid black',
                top: '1px',
                marginTop: '5px',
                marginLeft: '5px',
                cursor: 'pointer',
                fontWeight: `${active ? 'bolder' : 'normal'}`,
                backgroundColor: `${active ? 'lightseagreen' : 'darkseagreen' }`,
                ...active ? {
                    borderBottom: '1px solid lightseagreen',
                    top: '3px'
                } : {}
            }}
            onClick={() => onClick(id)}
        >
            {children}
        </span>
    )
}