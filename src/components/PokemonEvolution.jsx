import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { extractEvolutionNames } from './helpers';

const PokemonEvolution = ({ pokemon }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the evolution chain
    const fetchEvolutionChain = async () => {
      if (!pokemon) return;
      
      try {
        setLoading(true);
        
        // Step 1: Get species data that contains evolution chain URL
        const speciesResponse = await axios.get(pokemon.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        
        // Step 2: Get the evolution chain data
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionChain = evolutionResponse.data.chain;
        
        // Step 3: Extract evolution names from the chain
        const evoNames = extractEvolutionNames(evolutionChain);
        
        setEvolutions(evoNames);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch evolution chain:", error);
        setEvolutions(["Evolution data unavailable"]);
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-center">Evolution Chain</h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="pokeball w-12 h-12 relative">
            <div className="pokeball-button"></div>
          </div>
        </div>
      ) : (
        <motion.div 
          className="flex justify-center items-center flex-wrap gap-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {evolutions.map((evo, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <motion.div 
                  className="text-blue-500"
                  variants={item}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
              <motion.div 
                className={`text-center px-4 py-2 rounded-lg ${
                  pokemon.name.toLowerCase() === evo.toLowerCase() 
                    ? 'bg-blue-500 text-white font-bold shadow-md' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                variants={item}
                whileHover={{ scale: 1.05 }}
              >
                {evo}
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PokemonEvolution;