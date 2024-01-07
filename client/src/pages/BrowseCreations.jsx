import CreationViewer from "../components/CreationViewer";

export default function BrowseCreations({}) {
    return (
        <>
            Creations
            <CreationViewer creation={{
                name: 'creation',
                foods: [
                    {
                        name: 'food1',
                        histidine: 2,
                        isoleucine: 1
                    },
                    {
                        name: 'food2',
                        histidine: 1,
                        isoleucine: 2
                    }
                ]
            }} />
        </>
    )
}