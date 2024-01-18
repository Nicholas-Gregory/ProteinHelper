import { foodTotal } from "../utils/totals";
import { Link } from 'react-router-dom';

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
                            total + foodTotal(food.food)
                        , 0).toFixed(3)}
                    </div>
                    <p>
                        Created By: 
                        <Link to={`/users/${creation.user._id}`}>
                            {creation.user.username}
                        </Link>
                    </p>
                </>
            )}
        </>
    )
}