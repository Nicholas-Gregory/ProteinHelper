import { Outlet, useParams } from "react-router-dom";

export default function Combination({}) {
    const { combinationId } = useParams();

    return (
        <>
            Combination {combinationId}
            <Outlet />
        </>
    )
}