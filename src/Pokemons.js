import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPokemons, getPokemonDetails, getItem } from "./api/api";
import { Link } from "react-router-dom";
import { useQueryPokemons } from "./queries/useQueryPokemons";
import { BallTriangle } from "react-loader-spinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  height: 100vh;
`;

const Pagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
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

const DetailsButton = styled(Link)`
  color: white;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Pokemons = () => {
  const limit = 50;
  const [pokemonList, setPokemonList] = useState([]);
  const [listOfPokemonDetails, setListOfPokemonDetails] = useState({});
  const [listOfItemsImage, setListOfItemsImage] = useState({});
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);

  const { data } = useQueryPokemons();

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

  if (pokemonList.length === 0) {
    <BallTriangle heigth="50" width="50" color="white" />;
  }

  return (
    <Wrapper>
      <PokemonList>
        {pokemonList.map((pokemon) => {
          const details = listOfPokemonDetails[pokemon.name];

          return (
            <PokemonDetails key={pokemon.name}>
              {details ? (
                <LeftPanel>
                  <div>#{details.id}</div>
                  <div>{details.species.name}</div>
                  <DetailsButton to={`/pokemon/${details?.id}`}>
                    details
                  </DetailsButton>
                </LeftPanel>
              ) : (
                <BallTriangle heigth="50" width="50" color="white" />
              )}

              <img src={details?.sprites?.front_default} alt={"pokemon"} />
              <div>
                <div>Items</div>
                <div className="items">
                  {details?.held_items.map((item) => {
                    const imageUrl = listOfItemsImage[item.item.name];

                    return imageUrl ? (
                      <img
                        key={item.item.name}
                        src={imageUrl}
                        alt={item.item.name}
                      />
                    ) : (
                      <BallTriangle heigth="50" width="50" color="white" />
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
    </Wrapper>
  );
};

export default Pokemons;
