import { SetStateAction, useEffect } from "react";
import { storesData } from "../../../data";

interface SearchProps {
  selectedState?: string;
  setSelectedState: SetStateAction<any>;
  selectedCity?: string;
  setSelectedCity: SetStateAction<any>;
  searchTerm: string | null;
  setSearchTerm: SetStateAction<any>;
  cities: any;
  states: string[];
  stores: any;
  setStores: SetStateAction<any>;
}
const Search = (props: SearchProps) => {
  const {
    selectedState,
    setSelectedState,
    states,
    setSelectedCity,
    selectedCity,
    setSearchTerm,
    searchTerm,
    cities,
    stores,
    setStores,
  } = props;

  useEffect(() => {
    const filteredStores = storesData.filter((store: any) => {
      console.log(store)
      return store.nomeLoja.includes(searchTerm)
    })
    if (searchTerm) {
      setStores(filteredStores)
    }
  }, [searchTerm])

  return (
    <div className="flexCol">
      <input
        type={"text"}
        placeholder="Pesquise pelo nome de uma loja, cidade ou estado."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm ?? ""}
      />
      <select
        value={selectedState ?? "SELECIONE UM ESTADO"}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        {states.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {selectedState && (
        <select
          value={selectedCity ?? "SELECIONE UMA CIDADE"}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities?.map((o: string) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Search;
