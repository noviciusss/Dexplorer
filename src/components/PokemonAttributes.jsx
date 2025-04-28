import React from 'react';

const PokemonAttributes = ({ height, weight }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Physical Attributes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Height</p>
          <p>{height / 10} m</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Weight</p>
          <p>{weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonAttributes;