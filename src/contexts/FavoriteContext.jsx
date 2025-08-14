import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);


    const toggleFavorite = (movie) => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id);
        if (isFavorite) {
            setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
        } else {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
