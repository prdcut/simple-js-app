//IIFE
let pokemonRepository = (function () {
  let repository = [
  {name:'Charmander', height:0.6, types:['fire', 'dragon']},
  {name:'Mewtwo', height:2, types:['psychic', 'monster']},
  {name:'Squirtle', height:0.5, types:['water', 'monster']},
  {name:'Snorlax', height:2.1, types:['normal', 'monster']},
  ];

  function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "height" in pokemon &&
        "types" in pokemon
      ) {
        repository.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
      return repository;
    }
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener('click', showDetails);
      };

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
      };

    function showDetails(pokemon){
      console.log()
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
/*
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());
*/
