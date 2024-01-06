import { Link } from "react-router-dom";

export default function Header({ page }) {
    return (
        <>
            <div style={{ margin: 10 }}>
                <Link to={'/home'}>Protein Helper</Link>
            </div>

            <div 
                className={`tab-title-thick${page === 'home' ? ' tab-selected-thick' : ''}`}
                style={{ display: 'inline' }}
            >
                <Link to={'/home'}>Home</Link>
            </div>
            <div 
                className={`tab-title-thick${page === 'browse' ? ' tab-selected-thick' : ''}`}
                style={{ display: 'inline' }}
            >
                <Link to={'/browse'}>Browse</Link>
            </div>
            <div 
                className={`tab-title-thick${page === 'create' ? ' tab-selected-thick' : ''}`}
                style={{ display: 'inline' }}
            >
                <Link to={'/create'}>Create</Link>
            </div>
        </>
    )
}