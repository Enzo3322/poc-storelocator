import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  SetStateAction
} from 'react'
import { storesData } from '../data'

import { rangeArr } from '../utils/rangeArr'

export interface IStoreContext {
  selectedState: string
  setSelectedState: SetStateAction<string>
  selectedCity: string
  setSelectedCity: SetStateAction<string>
  searchTerm: string
  setSearchTerm: SetStateAction<any>
  cities: string[]
  states: string[]
  stores: Record<string, string>[]
  setStores: any
  pageNumbers: number[]
  setPageNumbers: SetStateAction<number[]>
  currentPage: number
  setCurrentPage: SetStateAction<number>
  handlePageChange: (pageNumber: number) => void
  totalPages: number
  currentItems: Record<string, string>[]
}

export const StoreContext = createContext({} as IStoreContext)

const StoreContextProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
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
  const [stores, setStores] = useState<Record<string, string>[]>(allStores)

  const itemsPerPage = 5

  // calcular o índice do primeiro item da página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // definir os itens que serão renderizados na página atual
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem)

  // calcular o número total de páginas
  const totalPages = Math.ceil(stores.length / itemsPerPage)
  const [pageNumbers, setPageNumbers] = useState<Number[]>(
    totalPages <= 5 ? rangeArr(1, totalPages) : rangeArr(1, 5)
  )
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    setSelectedCity('')
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
  }, [selectedState, selectedCity, searchTerm])

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
        pageNumbers,
        setPageNumbers,
        currentPage,
        setCurrentPage,
        handlePageChange,
        totalPages,
        currentItems
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
