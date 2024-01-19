import CreationList from "../components/CreationList";
import Loading from "../components/Loading";
import useData from "../hooks/useData";

export default function Discover({}) {
    const { data, error } = useData('GET', '/creation?sort=true', null);

    return (
        <>
            {data ? (
                <CreationList creations={data} />
            ) : (
                <Loading />
            )}

            {error &&
                <p>
                    {error}
                </p>
            }
        </>
    )
}