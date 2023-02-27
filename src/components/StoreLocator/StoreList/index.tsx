import Pagination from "./Pagination";
import StoreItem from "./StoreItem";

interface StoreListProps {
  stores: Record<string, string>[];
}

const StoreList = (props: StoreListProps) => {
  const { stores } = props;
  return (
    <div>
      StoreList
      {stores.map((store) => (
        <StoreItem store={store} />
      ))}
      <Pagination />
    </div>
  );
};

export default StoreList;
