import { Link } from "react-router-dom"
import FoodList from "../components/FoodList"
import FoodViewer from "../components/FoodViewer"

export default function Home({}) {
    return (
        <>
            <h1>
                Welcome to Protein Helper!
            </h1>
            <p>
                ProteinHelper is a quick and easy way to check the Essential Amino Acid levels of <Link to={'/browse/foods'}>individual foods</Link>,
                or to see the total levels in specific <Link to={'/create/new'}>combinations of foods</Link>.
            </p>
            <p>
                You can also <Link to={'/create/my'}>save and edit</Link> your creations, as well as <Link to={'/browse/creations'}>browse</Link> the creations of other users.
            </p>
            <p>
                <Link to={'/auth/signup'}>Create an account</Link> or <Link to={'/auth/login'}>login</Link> today to meet your protein goals!
            </p>
        </>
    )
}