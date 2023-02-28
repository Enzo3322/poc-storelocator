interface StoreItemProps {
  store: Record<string, string>;
}

const StoreItem = (props: StoreItemProps) => {
  const { store } = props;
  return <div>{store.storeName}</div>;
};

export default StoreItem;
