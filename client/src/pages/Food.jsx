import { useParams } from "react-router-dom";
import FoodViewer from "../components/FoodViewer";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { apiCall } from "../utils/http";

export default function Food({}) {
    const [food, setFood] = useState(null);
    const { foodId } = useParams();
    const { authorize } = useAuth();

    useEffect(() => {
        (async () => {
            setFood(await apiCall('GET', `/food/${foodId}`, null, authorize()));
        })();
    }, []);

    function handleCreateWithClick(id) {

    }

    return (
        <>
            {food && !food.error &&
                <FoodViewer 
                    food={food} 
                    onCreateWithButtonClick={handleCreateWithClick}
                />
            }

            {food && food.type === 'JsonWebTokenError' &&
                <p>
                    You must be logged in to view this resource
                </p>
            }

            {food && food.type === 'TokenExpiredError' &&
                <p>
                    Your session has expired.
                </p>
            }
        </>
    )
}