import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './components/Home';
import Favorites from './components/Favorites';
import PokemonDetails from './components/PokemonDetails';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <PokemonProvider>
      <FavoritesProvider>
        <Router>
          <div className="bg-purple-950 p-8 min-h-screen">
            <nav className="mb-8 flex justify-center gap-4">
              <Link to="/" className="text-white hover:text-purple-300">Home</Link>
              <Link to="/favorites" className="text-white hover:text-purple-300">
                Favorites
              </Link>
            </nav>

            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
                <Route path='/favorites' element={<Favorites />}/>
              </Routes>
            </ErrorBoundary>
          </div>
        </Router>
      </FavoritesProvider>
    </PokemonProvider>
  );
}

export default App;