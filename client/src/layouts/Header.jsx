import { Link } from "react-router-dom";
import AuthUtils from "./AuthUtils";

export default function Header({ page }) {
    return (
        <>
            <div style={{ margin: 10 }}>
                <Link to={'/home'}>Protein Helper</Link>
            </div>

            <div 
                className={`tab-title${page === 'home' ? ' tab-selected' : ''}`}
                style={{ 
                    display: 'inline-block',
                    backgroundColor: `${page === 'home' ? 'lightseagreen' : 'revert'}`
                }}
            >
                <Link to={'/home'}>Home</Link>
            </div>
            <div 
                className={`tab-title${page === 'browse' ? ' tab-selected' : ''}`}
                style={{ 
                    display: 'inline-block',
                    backgroundColor: `${page === 'browse' ? 'lightseagreen' : 'revert'}`
                }}
            >
                <Link to={'/browse'}>Browse</Link>
            </div>
            <div 
                className={`tab-title${page === 'create' ? ' tab-selected' : ''}`}
                style={{ 
                    display: 'inline-block',
                    backgroundColor: `${page === 'create' ? 'lightseagreen' : 'revert'}`
                }}
            >
                <Link to={'/create'}>Create</Link>
            </div>

            <AuthUtils page={page} />
        </>
    )
}