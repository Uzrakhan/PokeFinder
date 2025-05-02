import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorBoundary from './ErrorBoundary';

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch basic Pokémon details
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!pokemonResponse.ok) throw new Error('Pokémon not found');
        const pokemonData = await pokemonResponse.json();

        // Fetch species data for evolution chain
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        // Fetch evolution chain
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        
        // Process evolution chain
        const processEvolutionChain = (chain) => {
          const evolutions = [];
          let current = chain;
          while (current) {
            evolutions.push({
              name: current.species.name,
              id: current.species.url.split('/')[6]
            });
            current = current.evolves_to[0];
          }
          return evolutions;
        };

        setPokemon(pokemonData);
        setEvolutionChain(processEvolutionChain(evolutionData.chain));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  if (!pokemon) return <div className="text-center p-8">Pokémon not found</div>;

  return (
    <ErrorBoundary>
      <div className="bg-purple-950 min-h-screen p-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:text-purple-300 flex items-center"
        >
          ← Back to List
        </button>

        <div className="max-w-4xl mx-auto bg-purple-900 rounded-xl p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-64 h-64 object-contain"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white capitalize mb-4">
                {pokemon.name}
              </h1>
              <div className="flex gap-2 justify-center md:justify-start">
                {pokemon.types.map(type => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-1 rounded-full ${
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
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="bg-purple-800 p-4 rounded-lg">
                <h3 className="text-gray-400 text-sm uppercase">{stat.stat.name}</h3>
                <p className="text-2xl font-bold text-white">{stat.base_stat}</p>
              </div>
            ))}
          </div>

          {/* Abilities Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(ability => (
                <span
                  key={ability.ability.name}
                  className="bg-purple-800 text-white px-4 py-2 rounded-full"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          {/* Moves Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Moves</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {pokemon.moves.slice(0, 20).map(move => (
                <span
                  key={move.move.name}
                  className="bg-purple-800 text-white px-3 py-1 rounded text-sm text-center"
                >
                  {move.move.name}
                </span>
              ))}
            </div>
          </div>

          {/* Evolution Chain */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Evolution Chain</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {evolutionChain.map(evolution => (
                <Link
                  key={evolution.id}
                  to={`/pokemon/${evolution.id}`}
                  className="bg-purple-800 p-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                    alt={evolution.name}
                    className="w-32 h-32 mx-auto"
                  />
                  <p className="text-white text-center capitalize mt-2">
                    {evolution.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PokemonDetails;