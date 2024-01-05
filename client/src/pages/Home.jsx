import FoodList from "../components/FoodList"
import FoodViewer from "../components/FoodViewer"

export default function Home({}) {
    return (
        <>
            Home
            <FoodViewer food={{
                name: 'food',
                histidine: 1
            }}/>
        </>
    )
}