import { useState } from "react";
import { Link } from "react-router-dom"

export default function SideNav({ path }) {
    const page = path.substring(1).split('/')[0];
    const [subPage, setSubPage] = useState(path.split('/')[path.split('/').length - 1]);

    function getLinkData() {
        switch (page) {
            case 'browse':
                return [{ path: '/browse/foods', text: 'Foods' }, { path: '/browse/creations', text: 'Creations' }];
            case 'create':
                return [{ path: '/create/my', text: 'My Creations' }, { path: '/create/new', text: 'New Creation' }];
            case 'auth':
                return [{ path: '/auth/signup', text: 'Create Account' }, { path: '/auth/login', text: 'Login' }];
            default:
                return [];
        }
    }

    return (
        <div
            style={{
                marginRight: '10px',
                padding: '5px',
                backgroundColor: 'lightblue',
                borderRadius: '5px'
            }}
        >
            <div>
                {page.substring(0, 1).toUpperCase() + page.substring(1)}
            </div>
            {getLinkData().map(link =>
                <div
                    style={{
                        backgroundColor: `${subPage === link.path.split('/')[link.path.split('/').length - 1] && path.substring(1).split('/').length > 1 ? 'cornflowerblue' : 'lightblue'}`, //length > 1 means we are in a subpage and so something should be highlighted
                        borderRadius: '5px',
                        padding: '3px'
                    }}
                >
                    <Link to={link.path} onClick={() => setSubPage(link.path.split('/')[link.path.split('/').length - 1])}>{link.text}</Link><br /> 
                </div>
            )}
        </div>
    )
}