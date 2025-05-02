import { useFavorites } from "../context/FavoritesContext";
import PokemonCard from "./PokemonCard";

const Favorites = () => {
    const {favorites} = useFavorites();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Favorite Pokemon</h1>

            {favorites.length === 0 ? (
                <div className="text-center text-gray-400">
                    <p>No favorite yet! Click the 🤍 on Pokémon to add them.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites;