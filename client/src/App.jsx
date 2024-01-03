import AminoLevelsViewer from "./AminoLevelsViewer";
import AutoCompleteList from "./AutoCompleteList";

export default function App({}) {
    return (
        <AminoLevelsViewer
            aminos={[
                {
                    name: 'Histidine',
                    amount: 2.3
                }
            ]}
        />
    )
}