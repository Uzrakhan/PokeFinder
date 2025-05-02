import React from 'react'

const SearchBar = ({ onSearchChange }) => {
    
  return (
    <div>
        <input 
         type='text'
         onChange={(e) => onSearchChange(e.target.value)}
         placeholder='Search Pokemon'
         aria-label="Search Pokémon"
         className='w-full max-w-md mx-auto block px-4 py-2 rounded-lg mb-4'
        />
    </div>
  )
}

export default SearchBar