# PokeFinder

A React application that lets users explore and filter Pokémon data from the [PokeAPI](https://pokeapi.co/).

Live Demo(https://poke-finder-psi.vercel.app/)


## Features

- 🎣 Fetch first 150 Pokémon with detailed info
- 🔍 Real-time search by name
- 🎚️ Filter by Pokémon types
- 📱 Fully responsive design
- 🛠️ Error handling & loading states
- 🎨 Modern card-based UI

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **API**: [PokeAPI](https://pokeapi.co)
- **Deployment**: Vercel
- **Additional Libraries**: react-spinners

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pokemon-explorer.git

2.Install dependencies
npm install

3.Run the server.
npm run dev

USAGE

1.Search Pokemon
Type in the search bar to filter by name

2. Filter by type
Use the dropdown to select specific Pokémon types

3.View Details:
Each card has: ID, Name, Image(sprite), Type(s)


Key Implementation Details =>
State Management: React Hooks (useState, useEffect)
Error Handling: Network error detection & user-friendly messages
Optimizations: Parallel API requests with Promise.all()
Responsive Design: Grid layout with breakpoints for mobile/desktop

