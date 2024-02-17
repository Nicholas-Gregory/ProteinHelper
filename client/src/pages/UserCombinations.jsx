import { useOutletContext } from "react-router-dom"

export default function UserCombinations({}) {
    const user = useOutletContext();

    return (
        <>
            <h2>
                {user?.username}'s Combinations
            </h2>
        </>
    )
}