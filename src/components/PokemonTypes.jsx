import React from 'react';
import { getTypeColorClass } from './helpers';

const PokemonTypes = ({ types }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Type</h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type.type.name}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColorClass(type.type.name)}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonTypes;