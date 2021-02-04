let pokemonList = [
  {name:'Charmander', height:0.6, types:['fire', 'dragon']},
  {name:'Mewtwo', height:2, types:['psychic', 'monster']},
  {name:'Squirtle', height:0.5, types:['water', 'monster']},
  {name:'Snorlax', height:2.1, types:['normal', 'monster']},
];

for (let  i = 0; pokemonList.length; i++) {
  if (pokemonList[i].height <= 2){
    document.write("<br>" + pokemonList[i].name + " height is " + pokemonList[i].height + " m.");
  }else if (pokemonList[i].height > 2){
    document.write("<br>" + pokemonList[i].name + " height is " + pokemonList[i].height + " m." + " Wow, that's BIG!");
  }
}
