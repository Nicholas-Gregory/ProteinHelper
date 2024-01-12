import { Outlet, useNavigate } from "react-router-dom";
import TabNav from "../components/TabNav";

export default function Auth({}) {
    const navigate = useNavigate();

    function handleSelect(name) {
        navigate(`/auth/${name}`);
    }

    return (
        <>
            Login or Sign Up

            <br />
            <TabNav
                tabs={[
                    {
                        name: 'signup',
                        text: 'Create Account'
                    },
                    {
                        name: 'login',
                        text: 'Log In'
                    }
                ]}
                onSelect={handleSelect}
            />
            <div
                className="tab-content"
            >
                <Outlet />
            </div>
        </>
    )
}