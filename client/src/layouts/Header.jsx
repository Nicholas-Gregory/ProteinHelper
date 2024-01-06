import { Link } from "react-router-dom";

export default function Header({ page }) {
    return (
        <>
            <div style={{ margin: 10 }}>
                <Link to={'/home'}>Protein Helper</Link>
            </div>

            <div 
                className={`tab-title${page === 'home' ? ' tab-selected' : ''}`}
                style={{ display: 'inline-block' }}
            >
                <Link to={'/home'}>Home</Link>
            </div>
            <div 
                className={`tab-title${page === 'browse' ? ' tab-selected' : ''}`}
                style={{ display: 'inline-block' }}
            >
                <Link to={'/browse'}>Browse</Link>
            </div>
            <div 
                className={`tab-title${page === 'create' ? ' tab-selected' : ''}`}
                style={{ display: 'inline-block' }}
            >
                <Link to={'/create'}>Create</Link>
            </div>
        </>
    )
}