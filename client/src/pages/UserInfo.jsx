import { useOutletContext } from "react-router-dom"

export default function UserInfo({}) {
    const user = useOutletContext();

    return (
        <>
            <h2>
                {user?.username}'s Info
            </h2>
        </>
    )
}