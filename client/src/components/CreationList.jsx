import { foodTotal } from "../utils/totals";

export default function CreationList({ creations }) {
    return (
        <>
            {creations.map(creation => 
                <>
                    <div className="tab-title tab-selected">
                        {creation.name}
                    </div>
                    <div className='tab-content'>
                        Total EAA Levels (per 100g): &nbsp;
                        {creation.foods.reduce((total, food) =>
                            total + foodTotal(food)
                        , 0)}
                    </div>
                </>
            )}
        </>
    )
}