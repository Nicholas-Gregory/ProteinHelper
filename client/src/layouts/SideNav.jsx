import { Link } from "react-router-dom"

export default function SideNav({ page }) {
    function getLinks() {
        switch (page) {
            case 'browse':
                return ( 
                    <>
                        <Link to={'/browse/foods'}>Foods</Link>
                        <Link to={'/browse/creations'}>Creations</Link>
                    </>
                );
            case 'create':
                return (
                    <>
                        <Link to={'/create/my'}>My Creations</Link>
                        <Link to={'/create/new'}>New Creation</Link>
                    </>
                );
        }
    }

    return (
        <>
            <div>
                Side nav for {page}
            </div>
            {getLinks()}
        </>
    )
}