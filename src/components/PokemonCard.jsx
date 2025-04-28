import React from 'react'

const PokemonCard = ({ pokemon }) => {

  return (
    <div className='bg-purple-500 p-4 rounded-lg text-white w-full h-full'>
        <p className="text-white text-lg">{pokemon.id}</p>

        <img 
         src={pokemon.sprites.front_default}
         alt={pokemon.name}
         className='mx-auto h-24 w-24'
        />

        <h3 className="text-xl font-bold mb-2 capitalize text-center">{pokemon.name}</h3>

        <div className='flex gap-2 justify-center'>
            {pokemon.types.map((type,index) => (
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm" key={index}>
                    {type.type.name}
                </span>
            ))}
        </div>
    </div>
  )
}

export default PokemonCard