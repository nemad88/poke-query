import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "./api/api";
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

const PokemonDetails = (props) => {
  const [details, setDetails] = useState({});
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    getPokemonDetails(params.pokemonId).then((res) => {
      setDetails(res.data);
    });
  }, [params]);

  return (
    <Wrapper>
      <Details>
        <ReactJson src={details} collapsed={true} />
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
