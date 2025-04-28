import { useEffect, useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import { ClipLoader } from 'react-spinners'


function App() {
  const [pokemon,setPokemon] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
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

  const renderContent = () => {
    if(error) {
      return(
        <div className="text-red-400 text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Error!</h2>
          <p >{error}</p>
          <p className="mt-4">Refresh the page again.</p>
        </div>
      )
    }

    if(loading) {
      return(
        <div className="text-center mt-12">
          <ClipLoader color="#FFFFFF" size={50}/>
          <p className="text-white mt-4">Catching Pokemon...</p>
        </div>
      )
    }

    if(filteredPokemon.length === 0) {
      return(
        <div className="text-yellow-400 text-center p-8">
          <h3 className="text-2xl font-bold mb-4">No Pokemon Found.</h3>
          <p>Try adjusting search or filter settings.</p>
        </div>
      )
    }

    return(
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p}/>
        ))}
      </div>
    )
  };


  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if(!response.ok) {
          throw new Error(`HTTP error. status:${response.status}`)
        };

        const data = await response.json();

        const details = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            if(!res.ok) throw new Error(`Failed to fetch ${p.name}`)
            return res.json();
          })
        );
        setPokemon(details);
      }catch(error){
        setError(error.message)
      }finally{
        setLoading(false)
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

      {renderContent()}
    </div>
  )
}

export default App
