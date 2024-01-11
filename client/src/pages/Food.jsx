import { useLoaderData } from "react-router-dom";
import FoodViewer from "../components/FoodViewer";

export default function Food({}) {
    const food = useLoaderData();

    function handleCreateWithClick(id) {

    }

    return (
        <>
            {!food.error &&
                <FoodViewer 
                    food={food} 
                    onCreateWithButtonClick={handleCreateWithClick}
                />
            }

            {food.type === 'JsonWebTokenError' &&
                <p>
                    You must be logged in to view this resource
                </p>
            }

            {food.type === 'TokenExpiredError' &&
                <p>
                    Your session has expired.
                </p>
            }
        </>
    )
}