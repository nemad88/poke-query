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
  // SYNT ERROR
  // if (pokemonName === "raticate") {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => reject(new Error("Whoops!")), 1000);
  //   });
  // }
  return axios.get(`${baseURL}/pokemon/${pokemonName}`);
};

export const getItem = (itemName) => {
  return axios.get(`${baseURL}/item/${itemName}`);
};

export const getMoveDetails = (url) => {
  return axios.get(`${url}`);
};
