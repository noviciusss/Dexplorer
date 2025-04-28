// Helper function to get type color classes
export const getTypeColorClass = (typeName) => {
    switch (typeName) {
      case 'fire': return 'bg-red-100 text-red-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'grass': return 'bg-green-100 text-green-800';
      case 'electric': return 'bg-yellow-100 text-yellow-800';
      case 'psychic': return 'bg-purple-100 text-purple-800';
      case 'ice': return 'bg-cyan-100 text-cyan-800';
      case 'dragon': return 'bg-indigo-100 text-indigo-800';
      case 'dark': return 'bg-gray-800 text-white';
      case 'fairy': return 'bg-pink-100 text-pink-800';
      case 'normal': return 'bg-gray-100 text-gray-800';
      case 'fighting': return 'bg-red-200 text-red-800';
      case 'flying': return 'bg-blue-200 text-blue-800';
      case 'poison': return 'bg-purple-200 text-purple-800';
      case 'ground': return 'bg-yellow-200 text-yellow-800';
      case 'rock': return 'bg-gray-300 text-gray-800';
      case 'bug': return 'bg-green-200 text-green-800';
      case 'ghost': return 'bg-purple-300 text-purple-800';
      case 'steel': return 'bg-gray-400 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get stat color based on value
  export const getStatColor = (value) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 70) return 'bg-green-400';
    if (value >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };
  
  // Helper function to extract evolution names from the chain structure
  export const extractEvolutionNames = (chain) => {
    const names = [];
    
    // Add the base form
    names.push(chain.species.name);
    
    // Function to recursively go through evolution chain
    function addEvolutions(evolutionData) {
      if (evolutionData.evolves_to && evolutionData.evolves_to.length > 0) {
        evolutionData.evolves_to.forEach(evo => {
          names.push(evo.species.name);
          addEvolutions(evo);
        });
      }
    }
    
    addEvolutions(chain);
    return names.map(name => name.charAt(0).toUpperCase() + name.slice(1));
  };