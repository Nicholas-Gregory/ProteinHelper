import AutoCompleteList from "./AutoCompleteList";

export default function App({}) {
    return (
        <AutoCompleteList 
            items={['bread', 'cheese', 'eggs']} 
            maxHeight={50}
            onSelect={itemString => console.log(itemString)}
            onClose={() => console.log('closed')}
        />
    )
}