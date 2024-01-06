import { Link } from "react-router-dom";

export default function Header({ page }) {
    return (
        <>
            <div style={{ margin: 10 }}>
                <Link to={'/home'}>Protein Helper</Link>
            </div>

            <span className={`tab-title-thick${page === 'home' ? ' tab-selected-thick' : ''}`}>
                <Link to={'/home'}>Home</Link>
            </span>
            <span className={`tab-title-thick${page === 'browse' ? ' tab-selected-thick' : ''}`}>
                <Link to={'/browse'}>Browse</Link>
            </span>
            <span className={`tab-title-thick${page === 'create' ? ' tab-selected-thick' : ''}`}>
                <Link to={'/create'}>Create</Link>
            </span>
        </>
    )
}