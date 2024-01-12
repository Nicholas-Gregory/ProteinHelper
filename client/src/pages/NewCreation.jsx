import { useSearchParams } from "react-router-dom";
import Creator from "../components/Creator";

export default function NewCreation({}) {
    const [query] = useSearchParams();

    return (
        <>
            <Creator editing={true}/>
        </>
    )
}