import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuaryPokemonDetails } from "./queries/useQuaryPokemonDetails";
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
  let navigate = useNavigate();
  let params = useParams();
  const { data } = useQuaryPokemonDetails(params.pokemonId);

  return (
    <Wrapper>
      <Details>
        <ReactJson src={data} collapsed={true} />
      </Details>
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
