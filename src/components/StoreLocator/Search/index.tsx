import { useContext, useEffect } from 'react'
import { StoreContext, IStoreContext } from '../../../context'
import { storesData } from '../../../data'

interface ISearchProps {
  selectedCity: string
  selectedState: string
  searchTerm: string
  setStores: any
  allStores: any
}

const Search = () => {
  const {
    selectedState,
    setSelectedState,
    states,
    setSelectedCity,
    selectedCity,
    setSearchTerm,
    searchTerm,
    cities,
    setStores
  } = useContext(StoreContext) as IStoreContext

  function handleSearch({
    selectedCity,
    selectedState,
    allStores,
    searchTerm
  }: ISearchProps) {
    if (selectedState && !searchTerm && !selectedCity) {
      const storeByState = allStores.filter((store: any) => {
        return store.estado === selectedState
      })
      return setStores(storeByState)
    }
    if (selectedCity && !searchTerm) {
      const storeByCity = allStores.filter((store: any) => {
        return store.cidade === selectedCity
      })
      return setStores(storeByCity)
    }
    if (searchTerm && selectedState && !selectedCity) {
      const storeSearchState = allStores.filter((store: any) => {
        return (
          store.estado === selectedState &&
          store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      return setStores(storeSearchState)
    }
    if (searchTerm && selectedCity) {
      const storeSearchCity = allStores.filter((store: any) => {
        return (
          store.cidade === selectedCity &&
          store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      return setStores(storeSearchCity)
    }
    if (!selectedCity && !selectedState && searchTerm) {
      const filteredStores = allStores.filter((store: any) => {
        return store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
      })
      return setStores(filteredStores)
    }
    if (!selectedCity && !selectedState && !searchTerm) {
      return setStores(allStores)
    }
  }
  useEffect(() => {
    handleSearch({
      selectedCity,
      selectedState,
      allStores: storesData,
      searchTerm
    })
  }, [searchTerm, selectedCity, selectedState])

  return (
    <div className="flexCol">
      <input
        type={'text'}
        placeholder="Pesquise pelo nome de uma loja, cidade ou estado."
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm ?? ''}
      />
      <select
        value={selectedState}
        onChange={e => setSelectedState(e.target.value)}
      >
        <option defaultChecked defaultValue="">
          SELECIONE UM ESTADO
        </option>
        {states.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {selectedState && (
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
        >
          <option defaultChecked defaultValue="">
            SELECIONE UMA CIDADE
          </option>
          {cities?.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default Search
