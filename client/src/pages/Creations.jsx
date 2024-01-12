import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Creations({}) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            Creations

            <br />
            {location.pathname !== '/creations/new' &&
                <button
                    style={{
                        marginBottom: '3px'
                    }}
                    onClick={() => navigate('/creations/new')}
                >       
                    Create New
                </button>
            }


            <SearchBar 
                placeholderText={'Search Creations'}
            />
            <Outlet />
        </>
    )
}