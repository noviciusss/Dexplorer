import React from 'react';
import { getStatColor } from './helpers';

const PokemonStats = ({ stats }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
      <div className="space-y-2">
        {stats.map(stat => (
          <div key={stat.stat.name} className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium capitalize">{stat.stat.name.replace('-', ' ')}</span>
              <span className="text-sm font-medium">{stat.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getStatColor(stat.base_stat)}`} 
                style={{ width: `${Math.min(100, (stat.base_stat / 150) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;