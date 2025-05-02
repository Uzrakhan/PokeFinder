import { usePokemon } from "../context/PokemonContext";

const TypeFilter = ({ types = [] }) => {
  const { selectedTypes, setSelectedTypes } = usePokemon();

  // Add robust type checking
  if (!Array.isArray(types)) {
    console.error('TypeFilter: Expected array but received', typeof types);
    return null;
  }

  return (
    <div className="types flex flex-wrap gap-2 mb-4">
      {types.map((type) => (
        <button
          key={type}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTypes.includes(type)
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setSelectedTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;