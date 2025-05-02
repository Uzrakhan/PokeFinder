import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        if (!response.ok) throw new Error('Network response failed');

        const data = await response.json();
        if (!data.results || !Array.isArray(data.results)) return;

        const details = await Promise.all(
          data.results.map(async (p) => {
            try {
              const res = await fetch(p.url);
              return res.json();
            } catch (err) {
              console.error(`Failed to fetch ${p.name}:`, err);
              return null; // Handle failed individual fetches
            }
          })
        );
        setPokemon(details.filter(Boolean));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 || 
        p.types.some(t => selectedTypes.includes(t.type.name));
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchTerm, selectedTypes]);

  const value = {
    pokemon: filteredPokemon,
    loading,
    error,
    searchTerm,
    selectedTypes: selectedTypes || [],
    currentPage,
    itemsPerPage,
    setSearchTerm,
    setSelectedTypes,
    setCurrentPage,
    setItemsPerPage
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);