import { useAuth } from "../contexts/UserContext"

export default function CreateAccount({}) {
    const { signup } = useAuth();

    return (
        <>
            create acc
        </>
    )
}