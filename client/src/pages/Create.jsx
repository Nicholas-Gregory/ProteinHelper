import { useSearchParams } from "react-router-dom";
import Creator from "../components/Creator";

export default function Create({}) {
    const [query] = useSearchParams();

    return (
        <>
            <Creator editing={true}/>
        </>
    )
}