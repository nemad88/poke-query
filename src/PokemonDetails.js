import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuaryPokemonDetails } from "./queries/useQuaryPokemonDetails";
import { useQueryMovesDetails } from "./queries/useQueryMovesDetails";
import ReactJson from "react-json-view";
import styled from "styled-components";

const BackButton = styled.button`
  padding: 8px;
  margin: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const Details = styled.div`
  padding: 16px;
`;

const PokemonDetails = () => {
  const [movesUrls, setMovesUrls] = useState([]);

  let navigate = useNavigate();
  let params = useParams();
  const { data, isLoading } = useQuaryPokemonDetails(params.pokemonId);

  useEffect(() => {
    if (data && !isLoading) {
      const moves = data.moves.map((move) => move.move.url);
      //   setMovesUrls(moves);

      setTimeout(() => {
        setMovesUrls(moves);
      }, 5000);
    }
  }, [data, isLoading]);

  const results = useQueryMovesDetails(movesUrls, movesUrls.length > 0);

  return (
    <Wrapper>
      <Details>
        <ReactJson src={data} collapsed={true} />
      </Details>
      <div>
        {results.length > 0
          ? results.map((result) => {
              if (result.isSuccess) {
                return <div>{result.data.name}</div>;
              }
              return null;
            })
          : null}
      </div>
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </BackButton>
    </Wrapper>
  );
};

export default PokemonDetails;
