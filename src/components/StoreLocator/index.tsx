import { useEffect, useState } from 'react'
import { storesData } from '../../data'
import Search from './Search'
import StoreList from './StoreList'

const StoreLocatorPage = () => {
  const [selectedState, setSelectedState] = useState()
  const [selectedCity, setSelectedCity] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const cities = [
    ...new Set(
      storesData.map(store => {
        if (store.estado === selectedState) {
          return store.cidade
        }
      })
    )
  ]
  const states = [...new Set(storesData.map(store => store.estado))]
  const allStores = storesData
  const [stores, setStores] = useState(allStores)

  useEffect(() => {
    setSelectedCity(undefined)
  }, [selectedState])

  useEffect(() => {
    if (selectedState) {
      setStores(
        allStores.filter(
          store =>
            store.estado === selectedState &&
            store.nomeLoja.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      )
    }
    if (selectedCity) {
      setStores(
        allStores.filter(
          store =>
            store.cidade === selectedCity &&
            store.nomeLoja.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      )
    }
  }, [selectedState, selectedCity])

  return (
    <div>
      <div className="flexWrapper">
        <Search
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cities={cities}
          states={states}
          stores={stores}
          setStores={setStores}
        />
        <StoreList
          stores={stores}
          selectedCity={selectedCity}
          selectedState={selectedState}
        />
      </div>
    </div>
  )
}

export default StoreLocatorPage
