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
  const termFilterSearch =
    useEffect(() => {
      const filteredStores = storesData.filter((store: any) => {
        return (
          store.nomeLoja.toLowerCase().includes(searchLowerCase) ||
          store.cidade.toLowerCase().includes(searchLowerCase) ||
          store.estado.toLowerCase().includes(searchLowerCase)
        )
      })
      const filteredByRegion = filteredStores.filter((store) => {
        if (store.cidade === selectedCity) {
          return true
        }
        if (store.estado === selectedState) {
          return true
        }
        return false
      })
      if (searchTerm) {
        setStores(filteredStores)
      }
      if (selectedCity || selectedState) {
        setStores(filteredByRegion)
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
