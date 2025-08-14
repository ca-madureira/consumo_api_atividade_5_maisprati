import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export const MovieCard = ({
    title,
    releaseDate,
    posterPath,
    isFavorite,
    onToggleFavorite,
    onDetails,
}) => {
    return (
        <article className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
            />
            <h2>{title}</h2>
            <h3>{releaseDate.split("-")[0]}</h3>

            <button class="button-icon" onClick={onToggleFavorite}>
                {isFavorite ? (
                    <>
                        <MdFavorite />
                    </>
                ) : (
                    <>
                        <MdFavoriteBorder />
                    </>
                )}
            </button>

            <button class="button-details" onClick={onDetails}>Detalhes</button>
        </article>
    );
};
