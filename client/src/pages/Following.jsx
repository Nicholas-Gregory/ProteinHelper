import CreationList from '../components/CreationList'
import useData from "../hooks/useData";
import Loading from "../components/Loading";

export default function Following({}) {
    const { data, error } = useData('GET', '/creation?following=true&sort=true', null);

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