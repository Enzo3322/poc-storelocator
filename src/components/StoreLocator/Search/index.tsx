import { SetStateAction } from "react";

interface SearchProps {
  selectedState: string | null;
  setSelectedState: SetStateAction<any>;
  selectedCity: string | null;
  setSelectedCity: SetStateAction<any>;
  selectedSearch: string | null;
  setSelectedSearch: SetStateAction<any>;
  searchTerm: string | null;
  setSearchTerm: SetStateAction<any>;
  cities: string[];
  states: string[];
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
  } = props;
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
          {cities.map((o) => (
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
