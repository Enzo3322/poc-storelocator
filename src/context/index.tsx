import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  SetStateAction
} from 'react'
import { storesData } from '../data'

export interface IStoreContext {
  selectedState: string
  setSelectedState: SetStateAction<any>
  selectedCity: string
  setSelectedCity: SetStateAction<any>
  searchTerm: string
  setSearchTerm: SetStateAction<any>
  cities: string[]
  states: string[]
  stores: Record<string, string>[]
  setStores: SetStateAction<any>
  pageNumbers: Array<number>
}

export const StoreContext = createContext<IStoreContext | {}>({})

const StoreContextProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
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
    <StoreContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedState,
        setSelectedState,
        searchTerm,
        setSearchTerm,
        cities,
        states,
        stores,
        setStores,
        pageNumbers

      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
