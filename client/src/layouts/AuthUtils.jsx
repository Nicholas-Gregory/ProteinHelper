import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

export default function AuthUtils({ page }) {
    const { user, logout } = useAuth();

    return (
        <>
             <div
                className={`tab-title${page === 'auth' ? ' tab-selected' : ''}`}
                style={{ 
                    display: 'inline-block'
                }}
            >
                {user ? <a href='#' onClick={logout}>Logout</a> : <Link to='/auth'>Login/Signup</Link>}
            </div>
        </>
    )
}