//IIFE
let pokemonRepository = (function () {
  let pokemonList = [
  {name:'Charmander', height:0.6, types:['fire', 'dragon']},
  {name:'Mewtwo', height:2, types:['psychic', 'monster']},
  {name:'Squirtle', height:0.5, types:['water', 'monster']},
  {name:'Snorlax', height:2.1, types:['normal', 'monster']},
  ];

return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

// forEach Loop
pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.height <= 2){
    document.write("<br>" + pokemon.name + "'s height is " + pokemon.height + " m.");
  } else if (pokemon.height > 2) {
    document.write("<br>" + pokemon.name + "'s height is " + pokemon.height + " m." + " Wow, that's BIG!");
  }
});
