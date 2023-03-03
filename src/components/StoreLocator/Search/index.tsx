import { SetStateAction, useEffect } from 'react'
import { storesData } from '../../../data'

interface SearchProps {
  selectedState?: string
  setSelectedState: SetStateAction<any>
  selectedCity?: string
  setSelectedCity: SetStateAction<any>
  searchTerm: string | null
  setSearchTerm: SetStateAction<any>
  cities: any
  states: string[]
  stores: any
  setStores: SetStateAction<any>
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
    setStores
  } = props

  const searchLowerCase = searchTerm?.toLowerCase()
  function handleSearch({
    selectedCity,
    selectedState,
    allStores,
    searchTerm
  }: any) {
    if (selectedState && !searchTerm && !selectedCity) {
      const storeByState = allStores.filter((store: any) => {
        return store.estado === selectedState
      })
      console.log({ storeByState }) //funciona
      return setStores(storeByState)
    }
    if (selectedCity && !searchTerm) {
      const storeByCity = allStores.filter((store: any) => {
        store.cidade === selectedCity
      })
      console.log({ storeByCity }) //erro
      return setStores(storeByCity)
    }
    if (searchTerm && selectedState && !selectedCity) {
      const storeSearchState = allStores.filter((store: any) => {
        return (
          store.estado === selectedState &&
          store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      console.log({ storeSearchState }) //funciona
      return setStores(storeSearchState)
    }
    if (searchTerm && selectedCity) {
      const storeSearchCity = allStores.filter((store: any) => {
        return (
          store.cidade === selectedCity &&
          store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      console.log({ storeSearchCity }) //funciona
      return setStores(storeSearchCity)
    }
    if (!selectedCity && !selectedState && searchTerm) {
      const filteredStores: any = allStores.filter((store: any) => {
        return store.nomeLoja.toLowerCase().includes(searchTerm.toLowerCase())
      })
      console.log({ filteredStores }) //funciona
      return setStores(filteredStores)
    }
    if (!selectedCity && !selectedState && !searchTerm) {
      console.log({ allStores })
      return setStores(allStores) //funciona
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
        <option defaultChecked>SELECIONE UM ESTADO</option>
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
          <option defaultChecked>SELECIONE UMA CIDADE</option>
          {cities?.map((o: string) => (
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
