export default function CreationList({ creations }) {
    return (
        <>
            {creations.map(creation => 
                <>
                    <div className="tab-title tab-selected">
                        {creation.name}
                    </div>
                </>
            )}
        </>
    )
}