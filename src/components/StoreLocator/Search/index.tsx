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

  useEffect(() => {
    const storeByState = storesData.filter((store) => {
      return (
        store?.estado === selectedState
      )
    })
    const storeByCity = storesData.filter((store) => {
      return (
        store?.cidade === selectedCity
      )
    })
    const filteredStores = storesData.filter((store: any) => {
      if (selectedState && !storeByState.includes(store)) {
        return false
      } else if (selectedCity && !storeByCity.includes(store)) {
        return false;
      } else {
        return (
          store.nomeLoja.toLowerCase().includes(searchLowerCase) ||
          store.cidade.toLowerCase().includes(searchLowerCase) ||
          store.estado.toLowerCase().includes(searchLowerCase)

        )
      }
    })
    if (searchTerm) {
      setStores(filteredStores)
    }
    console.log(searchTerm)
  }, [searchTerm])

  return (
    <div className="flexCol">
      <input
        type={'text'}
        placeholder="Pesquise pelo nome de uma loja, cidade ou estado."
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm ?? ''}
      />
      <select
        value={selectedState ?? 'SELECIONE UM ESTADO'}
        onChange={e => setSelectedState(e.target.value)}
      >
        {states.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {selectedState && (
        <select
          value={selectedCity ?? 'SELECIONE UMA CIDADE'}
          onChange={e => setSelectedCity(e.target.value)}
        >
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
