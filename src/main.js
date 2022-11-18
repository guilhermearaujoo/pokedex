const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__img');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
const fullfilled = 200;
let searchPokemon = 1;
const maxPokemon = 640;

const showError = () => {
  pokemonName.innerHTML = 'Not found :C';
  pokemonNumber.innerHTML = '0';
  pokemonImage.style.display = 'none';
};

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (apiResponse.status === fullfilled) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  const data = await fetchPokemon(pokemon);

  if (data && data.id < maxPokemon) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    searchPokemon = Number(data.id);
    pokemonImage.src = data
      .sprites.versions['generation-v']['black-white']
      .animated.front_default;
  } else showError();
};

const formatInput = (string) => {
  const data = string.toLowerCase().trim();
  return data;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = formatInput(input.value);
  renderPokemon(data);
  input.value = '';
});

next.addEventListener('click', () => {
  if (searchPokemon !== maxPokemon) searchPokemon += 1;
  renderPokemon(searchPokemon);
});

prev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
