import { IoIosStar } from "react-icons/io";

export const DetailsCard = ({ infoMovie, director, cast }) => {


    const newNumber = parseFloat(infoMovie.vote_average).toFixed(2)

    return (
        <section className="details-container">
            <img
                src={`https://image.tmdb.org/t/p/w500${infoMovie.poster_path}`}
                alt={`Poster de ${infoMovie.title}`}
            />
            <div className="details-info">
                <h1>{infoMovie.title}</h1>

                <h2>Diretor</h2>
                <p>{director ? director.name : "Diretor não encontrado"}</p>

                <h2>Sinopse</h2>
                <p>{infoMovie.overview}</p>

                <h2>Elenco</h2>
                <ul>
                    {cast.slice(0, 5).map(actor => (
                        <li key={actor.cast_id}>
                            {actor.name} como {actor.character}
                        </li>
                    ))}
                </ul>

                <div className="details-rating">Avaliação: {newNumber}<span><IoIosStar /></span></div>
            </div>
        </section>
    );
};
