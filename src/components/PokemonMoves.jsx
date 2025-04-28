import React from 'react';

const PokemonMoves = ({ moves }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Moves</h3>
      <div className="flex flex-wrap gap-2">
        {/* Only show first 5 moves to avoid overcrowding */}
        {moves.slice(0, 5).map((moveData) => (
          <span
            key={moveData.move.name}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize"
          >
            {moveData.move.name.replace('-', ' ')}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonMoves;