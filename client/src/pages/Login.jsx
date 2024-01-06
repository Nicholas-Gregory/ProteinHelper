import { useAuth } from "../contexts/UserContext"

export default function Login({}) {
    const { login } = useAuth();

    return (
        <>
            <button onClick={login}>Login</button>
        </>
    )
}