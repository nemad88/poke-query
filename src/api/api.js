import axios from "axios";

const baseURL = `https://pokeapi.co/api/v2`;

export const getPokemons = (offset, limit) => {
  return axios.get(`${baseURL}/pokemon`, {
    params: {
      offset,
      limit,
    },
  });
};

export const getPokemonDetails = (pokemonName) => {
  return axios.get(`${baseURL}/pokemon/${pokemonName}`);
};

export const getItem = (itemName) => {
  return axios.get(`${baseURL}/item/${itemName}`);
};
