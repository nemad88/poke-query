import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "./api/api";
import ReactJson from "react-json-view";
import styled from "styled-components";

const BackButton = styled.button``;

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
    <div>
      <ReactJson src={details} collapsed={true} />
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </BackButton>
    </div>
  );
};

export default PokemonDetails;
