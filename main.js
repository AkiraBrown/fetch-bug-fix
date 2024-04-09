const searchBar = document.getElementById("search");
const searchList = document.getElementById("search-list");

searchBar.addEventListener("keyup", () => {
  handleInput(searchBar.value);
});
async function handleInput(search) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    const pokemonList = await response.json();
    const filterList = pokemonList.results.filter(({ name }) =>
      name.includes(search)
    );
    while (searchList.firstChild) {
      searchList.removeChild(searchList.firstChild);
    }
    if (filterList.length === 0) {
      createListItems({ name: "No Pokemon Found" });
    } else {
      filterList.map((item) => createListItems(item));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createListItems(data) {
  const pokeCard = document.createElement("li");
  const nameSpan = document.createElement("span");
  nameSpan.innerText = data.name;
  pokeCard.appendChild(nameSpan);
  if (data.url) {
    const pokeImg = document.createElement("img");
    pokeImg.src = await grabPokemonPic(data.url);
    pokeImg.style.width = "50px";
    pokeImg.style.height = "50px";
    pokeImg.loading = "lazy";
    pokeCard.appendChild(pokeImg);
  }
  searchList.appendChild(pokeCard);
}

async function grabPokemonPic(url) {
  try {
    const response = await fetch(url);
    const pokemonImage = await response.json();
    return pokemonImage.sprites.front_default;
  } catch (error) {
    console.log(error);
  }
}
