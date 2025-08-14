import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { MovieCard } from "../components/MovieCard";

export default function Favorites() {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return <p>Você ainda não tem filmes favoritos.</p>;
    }

    return (
        <main>
            <header className="header-movie">
                <h1>Meus Favoritos</h1>
            </header>

            <div className="movies-container">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        posterPath={movie.poster_path}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(movie)}
                        onDetails={() => window.location.href = `/details/${movie.id}`}
                    />
                ))}
            </div>
        </main>
    );
}
