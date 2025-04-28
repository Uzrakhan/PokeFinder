import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';

function App() {
  const [pokemon,setPokemon] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const allTypes = [...new Set (
    pokemon.flatMap(p => p.types.map(t => t.type.name))
  )]


  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || p.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();


        const details = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );
        setPokemon(details);
        setLoading(false)
      }catch(error){
        console.error('API error',error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className='bg-purple-950 p-8 min-h-screen'>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Poke Finder</h1>
      </header>

      <SearchBar onSearchChange={setSearchTerm}/>
      <TypeFilter onTypeChange={setSelectedType} types={allTypes}/>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ): (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredPokemon.map((p) => (
            <PokemonCard pokemon={p}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
