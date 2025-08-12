import { useEffect, useState, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css'

export default function Movies() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)


    const { favorites, toggleFavorite } = useContext(FavoritesContext);



    const searchMovie = async (movie, page = 1) => {
        try {
            setLoading(true);
            const response = await api.get(`/search/movie?query=${movie}&language=pt-BR&page=${page}`);
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages)
            setCurrentPage(page)
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const getMovies = async (page = 1) => {
        try {
            setLoading(true);
            const response = await api.get(`/movie/popular?language=pt-BR&page=${page}`);
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages)
            setCurrentPage(page)
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return

        if (searchTerm) {
            searchMovie(searchTerm, page)
        }
        getMovies(page)
    }

    const handleDetails = (id) => {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        getMovies();
    }, []);


    useEffect(() => {
        if (searchTerm === "") {
            getMovies();
        }
    }, [searchTerm]);


    if (error) return <div>Erro ao carregar filmes: {error.message}</div>;

    return (
        <main>
            <header className="header-movie">
                <form className="form-movie" onSubmit={(e) => {
                    e.preventDefault();
                    searchMovie(searchTerm);
                }}>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pesquisar filmes..."
                    />
                    <button type="submit">Pesquisar</button>
                </form>
            </header>
            {
                loading ? (
                    <div className="indicator"><ClipLoader color="#b3df4ec4" size={50} /></div>
                ) : (
                    <div className="movies-container">
                        {movies.map((movie) => {
                            const isFavorite = favorites.some((fav) => fav.id === movie.id);

                            return (
                                <article key={movie.id} className="movie-card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <h2>{movie.title}</h2>
                                    <h3>{movie.release_date.split('-')[0]}</h3>
                                    <button onClick={() => toggleFavorite(movie)}>
                                        {isFavorite ? (
                                            <>
                                                <MdOutlineFavorite /> Remover
                                            </>
                                        ) : (
                                            <>
                                                <MdFavoriteBorder /> Favoritar
                                            </>
                                        )}
                                    </button>

                                    <button onClick={() => handleDetails(movie.id)}>Detalhes</button>
                                </article>
                            );
                        })}

                    </div>
                )
            }



            <section className="pagination-container">
                {totalPages > 1 && (
                    <div className="pagination-card">
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                        <span>Página {currentPage} de {totalPages}</span>

                        <button
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </section>

        </main>
    );
}