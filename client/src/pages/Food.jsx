import { useLoaderData } from "react-router-dom";
import FoodViewer from "../components/FoodViewer";

export default function Food({}) {
    const food = useLoaderData();

    console.log(food)

    function handleCreateWithClick(id) {

    }

    return (
        <>
            <FoodViewer 
                food={food} 
                onCreateWithButtonClick={handleCreateWithClick}
            />
        </>
    )
}