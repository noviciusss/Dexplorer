import React from 'react';
import { motion } from 'framer-motion';
import PokemonTypes from './PokemonTypes';
import PokemonMoves from './PokemonMoves';
import PokemonAttributes from './PokemonAttributes';
import PokemonStats from './PokemonStats';
import PokemonImage from './PokemonImage';
import PokemonEvolution from './PokemonEvolution';

const PokemonDetail = ({ pokemon, onClose }) => {
  if (!pokemon) return null;
  
  // Get primary type for theming
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  
  // Background gradient based on Pokemon type
  const getBackgroundGradient = (type) => {
    switch(type) {
      case 'fire': return 'from-orange-400 to-red-500';
      case 'water': return 'from-blue-400 to-blue-600';
      case 'grass': return 'from-green-400 to-green-600';
      case 'electric': return 'from-yellow-300 to-amber-500';
      case 'psychic': return 'from-pink-400 to-purple-500';
      case 'ice': return 'from-cyan-300 to-blue-400';
      case 'dragon': return 'from-indigo-500 to-purple-700';
      case 'dark': return 'from-gray-700 to-gray-900';
      case 'fairy': return 'from-pink-300 to-pink-500';
      case 'poison': return 'from-purple-400 to-purple-600';
      case 'ground': return 'from-amber-400 to-amber-600';
      case 'rock': return 'from-gray-400 to-gray-600';
      case 'fighting': return 'from-red-500 to-red-700';
      case 'ghost': return 'from-indigo-400 to-purple-600';
      case 'flying': return 'from-blue-300 to-indigo-500';
      case 'bug': return 'from-lime-400 to-green-600';
      case 'steel': return 'from-gray-300 to-gray-500';
      default: return 'from-gray-100 to-gray-300';
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-pokeball-pattern"></div>
      
        
        <div className="bg-white/90 backdrop-blur-sm m-1 rounded-lg h-[calc(100%-0.5rem)] overflow-y-auto">
          {/* Close button */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm flex justify-end p-2 border-b">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col md:flex-row gap-8">
            {/* Left side - Information */}
            <motion.div 
              className="flex-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <motion.h2 
                  className="text-3xl font-extrabold capitalize"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {pokemon.name}
                </motion.h2>
                <span className="ml-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">#{pokemon.id}</span>
              </div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonTypes types={pokemon.types} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonMoves moves={pokemon.moves} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonAttributes height={pokemon.height} weight={pokemon.weight} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonStats stats={pokemon.stats} />
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side - Image and Evolution */}
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} p-4 rounded-lg mb-6`}>
                <PokemonImage sprites={pokemon.sprites} name={pokemon.name} />
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 flex-grow">
                <PokemonEvolution pokemon={pokemon} />
              </div>
            </motion.div>        
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonDetail;