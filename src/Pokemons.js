import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPokemons, getPokemonDetails, getItem } from "./api/api";
import Dump from "./Dump";
import { useQueryPokemons } from "./queries/useQueryPokemons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Pagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokemonList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const PokemonDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f0147;
  color: white;
  padding: 8px;
  margin: 4px;
  width: 280px;
  height: 100px;
  cursor: pointer;

  .items {
    flex-direction: row;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const PageButton = styled.button`
  background-color: #fffaaa;
  padding: 4px;
  margin: 4px;
  cursor: pointer;
`;

const Pokemons = () => {
  const limit = 20;
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState("");
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState({});
  const [listOfItemsImage, setListOfItemsImage] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dumpVisible, setDumpVisible] = useState(false);
  const [dumpData, setDumpData] = useState({});

  const query = useQueryPokemons();

  console.log(query);

  useEffect(() => {
    getPokemons(offset, limit).then((res) => {
      setPage(res.data.count / limit + 1);
      setPokemonList(res.data.results);
      res.data.results.forEach((pokemonData) => {
        getPokemonDetails(pokemonData.name).then((res) => {
          if (res.data.held_items.length > 0) {
            res.data.held_items.forEach((item) => {
              getItem(item.item.name).then((res) => {
                setListOfItemsImage((list) => {
                  return {
                    ...list,
                    [item.item.name]: res.data.sprites.default,
                  };
                });
              });
            });
          }

          setListOfPokemonDetails((list) => {
            return { ...list, [pokemonData.name]: res.data };
          });
        });
      });
    });
  }, [offset]);

  useEffect(() => {
    if (selectedPokemon) {
      getPokemonDetails(selectedPokemon).then((res) => {
        setPokemonDetails(res.data);
        setDumpData(res.data);
      });
    }
  }, [selectedPokemon]);

  return (
    <Wrapper>
      <div>
        {pokemonDetails ? (
          <div>
            <h2>Details</h2>
            <h3>Abilities</h3>
            <div>
              {pokemonDetails.abilities.map((ability) => (
                <>
                  <div>{ability.ability.name}</div>
                </>
              ))}
              <img src={pokemonDetails.sprites.front_default} alt={"pokemon"} />
            </div>
          </div>
        ) : null}
      </div>

      <PokemonList>
        {pokemonList.map((pokemon) => {
          const details = listOfPokemonDetails[pokemon.name];

          return (
            <PokemonDetails
              key={pokemon.name}
              onClick={() => {
                setSelectedPokemon(pokemon.name);
              }}
            >
              <div>
                <div>#{details?.id}</div>
                <div>{details?.species?.name}</div>
              </div>

              <img src={details?.sprites?.front_default} alt={"pokemon"} />
              <div>
                <div>Items</div>
                <div className="items">
                  {details?.held_items.map((item) => {
                    const imageUrl = listOfItemsImage[item.item.name];

                    return (
                      <img
                        key={item.item.name}
                        src={imageUrl}
                        alt={item.item.name}
                      />
                    );
                  })}
                </div>
              </div>
            </PokemonDetails>
          );
        })}
      </PokemonList>

      <Pagination>
        {Array.from({ length: page }, (_, k) => (
          <PageButton
            key={k}
            onClick={() => {
              setOffset(k * limit);
            }}
          >
            {k + 1}
          </PageButton>
        ))}
      </Pagination>
      <Dump
        dumpData={dumpData}
        dumpVisible={dumpVisible}
        setDumpVisible={setDumpVisible}
      />
    </Wrapper>
  );
};

export default Pokemons;
