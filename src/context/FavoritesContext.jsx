import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    if(typeof window !== 'undefined'){
        const saved = localStorage.getItem('pokemonFavorites');
        return saved ? JSON.parse(saved) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites(
        prev => [
            ...prev,
            {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types,
                sprite: pokemon.sprites.front_default
            }
        ]
    );
  };

  const toggleFavorite = (pokemon) => {
    setFavorites(prev => {
        const exists = prev.some(f => f.id === pokemon.id);
        if(exists) {
            return prev.filter(f => f.id !== pokemon.id)
        }

        return [...prev, {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types,
            sprite: pokemon.sprites.front_default
        }]
    })
  }
  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(f => f.id === id);
  }


  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite,toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if(!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
