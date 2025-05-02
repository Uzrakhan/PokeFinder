import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const PokemonCard = memo(({ pokemon }) => {
  const { isFavorite ,toggleFavorite} = useFavorites();
  const favorite = isFavorite(pokemon.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon)
  };

  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="bg-purple-900 p-4 rounded-lg hover:transform hover:scale-105 transition-all"
    >
      <div className="relative">
        <button 
          onClick={handleFavorite}
          className={`absolute top-2 right-2 text-2xl z-10 transition-transform ${
            favorite ? 'text-red-500 hover:scale-110' : 'text-white hover:scale-105'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
          alt={pokemon.name}
          className="mx-auto h-32 w-32 object-contain"
        />
      </div>
      <h3 className="text-center text-white text-xl font-bold capitalize mt-2">
        {pokemon.name}
      </h3>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map(type => (
          <span 
            key={type.type.name}
            className={`px-3 py-1 rounded-full text-sm ${
              type.type.name === 'fire' ? 'bg-red-500' :
              type.type.name === 'water' ? 'bg-blue-500' :
              'bg-gray-500'
            }`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
});

export default PokemonCard;