import React from 'react'
import { usePokemon } from '../context/PokemonContext'

const TypeFilter = ({ types = [] }) => {
  const [selectedTypes,setSelectedTypes] = usePokemon();

  if (!types || !Array.isArray(types)) return null;
  
  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <div className="type-filter mb-4 flex flex-wrap gap-2">
      {types.map(type =>(
        <button 
         key={type}
         className={`px-4 py-2 rounded-full text-sm ${
          selectedTypes.includes(type)
            ? 'bg-purple-500 text-white'
            : 'bg-gray-200 text-gray-700'
          }`}
         onClick={() => handleTypeToggle(type)}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter