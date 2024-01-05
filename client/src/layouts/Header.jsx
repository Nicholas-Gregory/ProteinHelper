import { Link } from "react-router-dom";

export default function Header({ page }) {
    return (
        <>
            <div>
                <Link to={'/home'}>Protein Helper</Link>
            </div>
            <Link to={'/home'}>Home</Link>
            <Link to={'/browse'}>Browse</Link>
            <Link to={'/create'}>Create</Link>
        </>
    )
}