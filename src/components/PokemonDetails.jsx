import { useParams } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import ErrorBoundary from './ErrorBoundary';
import LoadingSkeleton from './LoadingSkeleton';

const PokemonDetails = () => {
  const { id } = useParams();
  const { pokemon, loading } = usePokemon();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (pokemon.length > 0) {
      const found = pokemon.find(p => p.id === Number(id));
      setDetails(found);
    }
  }, [id, pokemon]);

  if (loading) return <LoadingSkeleton />;
  if (!details) return <div>Pokemon not found</div>;

  return (
    <ErrorBoundary>
      <div className="bg-purple-900 p-6 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-4 capitalize">{details.name}</h2>
        <img 
          src={details.sprites.front_default} 
          alt={details.name} 
          className="mx-auto mb-4"
        />
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {details.stats.map(stat => (
            <div key={stat.stat.name} className="bg-purple-800 p-3 rounded">
              <h3 className="font-bold">{stat.stat.name}</h3>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {details.abilities.map(ability => (
              <span 
                key={ability.ability.name}
                className="bg-purple-800 px-3 py-1 rounded-full text-sm"
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PokemonDetails;