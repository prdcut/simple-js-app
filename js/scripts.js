let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() { 
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); //selects the pokemonList class
    let listpokemon = document.createElement("li"); //creates ul in index.html
    let button = document.createElement("button"); // creates a button
    button.innerText = pokemon.name; // asign text to already created button
    button.classList.add("button-class"); //class for CSS reference
    listpokemon.appendChild(button); // adds child element - the button - to the created ul
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon); // this button will perform the modal while clicked
    });
  }

  function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.abilities = [];
        details.abilities.forEach(function (pokemonType) {
          item.abilities.push(pokemonType.ability.name);
        });
        item.types = [];
        details.types.forEach(function (pokemonType) {
          item.types.push(pokemonType.type.name);
        });
      }).catch(function (e) {
        console.error(e);
      });
    };

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    };

    function showModal(pokemonList) {
      let modalContainer = document.querySelector('#modal-container');

      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener("click", hideModal);

      let pokemonName = document.createElement('h1');
      pokemonName.innerText = pokemonList.name;

      let pokemonImage = document.createElement("img");
      pokemonImage.classList.add("modal-img");
      pokemonImage.setAttribute("src", pokemonList.imageUrl);

      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = "Height: " + pokemonList.height;

      let pokemonTypes = document.createElement('p');
      pokemonTypes.innerText = "Types: " + pokemonList.types;

      let pokemonAbilities = document.createElement('p');
      pokemonAbilities.innerText = "Abilities: " + pokemonList.abilities;

      modal.appendChild(closeButtonElement);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonImage);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonTypes);
      modal.appendChild(pokemonAbilities);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal(pokemonList);
    });

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();
      }
    });
    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

  });
});
