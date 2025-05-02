import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(pokemon => (
            <div key={pokemon.id} className="bg-purple-900 p-4 rounded-lg">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="mx-auto h-32 w-32 object-contain"
              />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;