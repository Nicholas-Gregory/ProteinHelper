import { foodTotal } from "../utils/totals";
import { Link } from 'react-router-dom';
import TabCard from "./TabCard";

export default function CreationList({ creations }) {
    return (
        <>
            {creations.map(creation => 
                <>
                    <TabCard
                        title={creation.name}
                    >
                        Total EAA Levels (per 100g): &nbsp;
                        {creation.foods.reduce((total, food) =>
                            total + foodTotal(food.food)
                        , 0).toFixed(3)}
                        <p>
                            Created By: 
                            <Link to={`/users/${creation.user._id}`}>
                                {creation.user.username}
                            </Link>
                        </p>
                    </TabCard>
                </>
            )}
        </>
    )
}