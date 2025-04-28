import React from 'react';
import { motion } from 'framer-motion';

const PokemonImage = ({ sprites, name }) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-full max-w-xs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Shadow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/20 rounded-full blur-md"></div>
        
        <motion.img 
          src={sprites.other?.['official-artwork']?.front_default || sprites.front_default} 
          alt={name}
          className="w-full object-contain drop-shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </div>
  );
};

export default PokemonImage;