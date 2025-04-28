import React from 'react'

const TypeFilter = ({ types, onTypeChange }) => {
  return (
    <div className='mb-2'>
        <select 
         onChange={(e) => onTypeChange(e.target.value)}
         className='w-full max-w-md mx-auto block px-4 py-2 rounded-lg mb-6'
        >
            <option value="all">All Types</option>
            {types.map(type => (
                <option value={type} key={type} className="capitalize">
                    {type}
                </option>
            ))}
        </select>
    </div>
  )
}

export default TypeFilter