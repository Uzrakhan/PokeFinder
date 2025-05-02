import React from 'react'
import { usePokemon } from '../context/PokemonContext'

const SearchBar = ({ onSearchChange }) => {
    const {searchTerm, setSearchTerm} = usePokemon();

  return (
    <div>
        <input 
         type='text'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         placeholder='Search Pokemon'
         aria-label="Search Pokémon"
         className='w-full max-w-md mx-auto block px-4 py-2 rounded-lg mb-4'
        />
    </div>
  )
}

export default SearchBar