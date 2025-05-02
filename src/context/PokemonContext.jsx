import { createContext, useContext, useState, useEffect, useMemo,useCallback } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (!data?.results || !Array.isArray(data.results)) {
        throw new Error('Invalid API response format');
      }

      // Add error handling for individual requests
      const details = await Promise.all(
        data.results.map(async (p) => {
          try {
            const res = await fetch(p.url);
            if (!res.ok) throw new Error(`Failed to fetch ${p.name}`);
            return res.json();
          } catch (error) {
            console.error(error.message);
            return null;
          }
        })
      );

      // Filter out failed requests
      setPokemon(details.filter(Boolean));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies are empty as there are no external values being used.

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData as a dependency



  const filteredPokemon = useMemo(() => {
    return pokemon.filter(p => {
      // Add null checks for pokemon data
      if (!p?.types || !p.name) return false;

      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 || 
        p.types.some(t => selectedTypes.includes(t.type.name));
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchTerm, selectedTypes]);

  const value = {
    pokemon: filteredPokemon,
    paginatedPokemon: filteredPokemon.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    loading,
    error,
    searchTerm,
    selectedTypes: selectedTypes || [],
    currentPage,
    itemsPerPage,
    totalPages: Math.ceil(filteredPokemon.length / itemsPerPage),
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

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if(!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}