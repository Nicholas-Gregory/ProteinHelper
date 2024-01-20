import CreationListItem from "./CreationListItem";

export default function CreationList({ creations }) {
    return (
        <>
            {creations.map(creation => 
                <>
                    <CreationListItem creation={creation} />                 
                </>
            )}
        </>
    )
}