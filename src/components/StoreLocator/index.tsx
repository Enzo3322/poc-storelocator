import { useEffect, useState } from "react";
import Search from "./Search";
import StoreList from "./StoreList";

const StoreLocatorPage = () => {
  //==states for search component=====//
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  //=================================//
  //states for stores list component
  const [stores, setStores] = useState([]);

  useEffect(() => {
    //quando o componente renderizar fazemos a chamada para o back onde recebemos os estados cidades e lojas
    //após a chamada setamos seu retorno nos estados
  }, []);

  useEffect(() => {
    //
  }, [selectedState, selectedCity]);

  return (
    <div>
      <div>
        <Search
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedSearch={selectedSearch}
          setSelectedSearch={setSelectedSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cities={cities}
          states={states}
        />
        <StoreList stores={stores} />
      </div>
    </div>
  );
};

export default StoreLocatorPage;
