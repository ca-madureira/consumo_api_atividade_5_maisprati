import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams } from "react-router-dom";

export default function Details() {
    const { id } = useParams();
    const [infoMovie, setInfoMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovie = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/movie/${id}`);
            setInfoMovie(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (id) {
            getMovie();
        }
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!infoMovie) return <p>Filme não encontrado.</p>;

    return (
        <main className="details-container">
            <img
                src={`https://image.tmdb.org/t/p/w500${infoMovie.poster_path}`}
                alt={`Poster de ${infoMovie.title}`}
            />
            <div className="details-info">
                <h1>{infoMovie.title}</h1>
                <h2>Sinopse</h2>
                <p>{infoMovie.overview}</p>
                <div className="details-rating">Avaliação: {infoMovie.vote_average}</div>
            </div>
        </main>
    );
}
