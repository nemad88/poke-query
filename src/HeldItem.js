import { useQueryHeldItems } from "./queries/useQueryHeldItems";

const HeldItem = (props) => {
  const { itemName } = props;
  const { data, isLoading } = useQueryHeldItems(itemName);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <img src={data.sprites.default} alt={itemName} />
    </div>
  );
};

export default HeldItem;
