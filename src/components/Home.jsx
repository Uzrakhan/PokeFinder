import { usePokemon } from '../context/PokemonContext';
import { useMemo } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import LoadingSkeleton from './LoadingSkeleton';
import Pagination from './Pagination';

const Home = () => {
  const { 
    pokemon,
    paginatedPokemon,
    loading,
    error,
    itemsPerPage,
    searchTerm
    } = usePokemon();

    const { favorites } = useFavorites();

  // Get unique types from all Pokémon
  
  const allTypes = useMemo(() => {
    try {
      return [...new Set(
        (pokemon || [])
          .flatMap(p => (p?.types || []))
          .map(t => t?.type?.name)
          .filter(Boolean)
      )];
    } catch (error) {
      console.error('Error calculating types:', error);
      return [];
    }
  }, [pokemon]);


    
  if (error) {
    return (
      <div className="text-red-400 text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Error!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
        <SearchBar />

        {/* Add search term display */}
        {searchTerm && !loading && (
            <div className="text-white text-center mb-4">
            Showing results for: "{searchTerm}"
            </div>
        )}
        
        <TypeFilter types={allTypes}/>

        {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Use destructured itemsPerPage */}
            {[...Array(itemsPerPage)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
        ) : (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Add array check */}
                {Array.isArray(paginatedPokemon) && 
                 paginatedPokemon.map(p => (
                    <PokemonCard key={p.id} pokemon={p}/>
                 ))
                }
            </div>
        <Pagination /> {/* Add pagination controls */}
        </>
        )}
    </div>
  );
};

export default Home;