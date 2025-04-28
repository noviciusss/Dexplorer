import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import PokemonCard from './components/PokemonCard';
import PokemonDetail from './components/PokemonDetail';
import SearchBar from './components/SearchBar';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return pokemonDetails.data;
          })
        );
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
        
        // Extract unique types
        const allTypes = new Set();
        pokemonData.forEach(pokemon => {
          pokemon.types.forEach(type => {
            allTypes.add(type.type.name);
          });
        });
        setTypes(Array.from(allTypes));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-cyan-400">
        <div className="pokeball w-16 h-16 relative">
          <div className="pokeball-button"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-red-500 to-orange-400">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-500 text-xl font-bold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100">
      {/* Pokeball pattern background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute -top-20 -left-20 pokeball w-40 h-40"></div>
        <div className="absolute top-1/4 right-10 pokeball w-32 h-32"></div>
        <div className="absolute bottom-20 left-1/3 pokeball w-24 h-24"></div>
        <div className="absolute top-2/3 right-1/4 pokeball w-36 h-36"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.h1 
            className="text-5xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Pokémon Explorer
          </motion.h1>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
              Explore the world of Pokémon with our interactive Pokédex. Search and filter to find your favorites!
            </p>
          </motion.div>
          
          {/* Search */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 bg-white rounded-xl shadow-md p-2"
          >
            <SearchBar
              onSearch={handleSearch}
              onTypeFilter={handleTypeFilter}
              types={types}
            />
          </motion.div>

          {/* Pokemon Grid */}
          {filteredPokemon.length === 0 ? (
            <motion.div 
              className="flex items-center justify-center h-48 bg-white/80 rounded-xl shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <p className="text-xl text-gray-600">No Pokémon found matching your criteria</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedType(''); }} 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {filteredPokemon.map((pokemon) => (
                <motion.div
                  key={pokemon.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <PokemonCard 
                    pokemon={pokemon} 
                    onClick={handlePokemonClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Pokemon Detail Modal */}
      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetail 
            pokemon={selectedPokemon} 
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;