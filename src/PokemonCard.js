import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuaryPokemonDetails } from "./queries/useQuaryPokemonDetails";
import { BallTriangle } from "react-loader-spinner";
import HeldItem from "./HeldItem";

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

const DetailsButton = styled(Link)`
  color: white;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PokemonCard = (props) => {
  const { pokemonName } = props;
  const { data, isLoading } = useQuaryPokemonDetails(pokemonName);

  const selectHeldItems = (data) => {
    return data.held_items.map((heldItem) => heldItem.item);
  };

  const { data: heldItemsData, isLoading: heldItemsDataIsLoading } =
    useQuaryPokemonDetails(pokemonName, selectHeldItems);

  if (isLoading || heldItemsDataIsLoading) {
    return <BallTriangle heigth="50" width="50" color="white" />;
  }

  return (
    <PokemonDetails key={pokemonName}>
      {data ? (
        <LeftPanel>
          <div>#{data?.id}</div>
          <div>{data?.species?.name}</div>
          <DetailsButton to={`/pokemon/${pokemonName}`}>data</DetailsButton>
        </LeftPanel>
      ) : (
        <BallTriangle heigth="50" width="50" color="white" />
      )}

      <img src={data?.sprites?.front_default} alt={"pokemon"} />
      <div>
        <div>Items</div>
        <div className="items">
          {heldItemsData.map((item) => {
            const itemName = item.name;
            return <HeldItem key={itemName} itemName={itemName} />;
          })}
        </div>
      </div>
    </PokemonDetails>
  );
};

export default PokemonCard;
