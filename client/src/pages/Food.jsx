import { useLoaderData } from "react-router-dom";
import FoodViewer from "../components/FoodViewer";

export async function loader({ params }) {
    
}

export default function Food({}) {
    const food = useLoaderData();

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