import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { DetailsCard } from "../components/DetailsCard";

export default function Details() {
    const { id } = useParams();
    const [infoMovie, setInfoMovie] = useState(null);
    const [director, setDirector] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovie = async () => {
        setLoading(true);
        setError(null);
        try {
            const responseDetails = await api.get(`/movie/${id}`);
            setInfoMovie(responseDetails.data);

            const responseCredits = await api.get(`/movie/${id}/credits`);
            const diretor = responseCredits.data.crew.find(member => member.job === "Director");
            setDirector(diretor);
            setCast(responseCredits.data.cast);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getMovie();
    }, [id]);

    if (error) return <p>Erro: {error.message}</p>;
    if (loading) return <div className="indicator"><ClipLoader color="#b3df4ec4" size={50} /></div>;
    if (!infoMovie) return <p>Filme não encontrado.</p>;

    return (
        <main>
            <DetailsCard
                infoMovie={infoMovie}
                director={director}
                cast={cast}
            />
        </main>
    );
}
