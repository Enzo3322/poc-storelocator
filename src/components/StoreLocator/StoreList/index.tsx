import Pagination from './Pagination'
import StoreItem from './StoreItem'
import { rangeArr } from '../../../utils/rangeArr'
import { StoreContext, IStoreContext } from '../../../context'

import React, { useEffect, useState, useContext } from 'react'

const StoreList = () => {
  const { stores, selectedCity, selectedState } = useContext<any>(StoreContext)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // calcular o índice do primeiro item da página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // definir os itens que serão renderizados na página atual
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem)

  // calcular o número total de páginas
  const totalPages = Math.ceil(stores.length / itemsPerPage)

  // criar uma lista de números de página para a paginação

  const [pageNumbers, setPageNumbers] = useState(
    totalPages <= 5 ? rangeArr(1, totalPages) : rangeArr(1, 5)
  )

  useEffect(() => {
    const getPageNumbers = (start: any, end: any) =>
      setPageNumbers(rangeArr(start, end))

    if (totalPages < 5) {
      getPageNumbers(1, totalPages)
    } else if (currentPage <= 3) {
      getPageNumbers(1, 5)
    } else if (currentPage >= totalPages - 2) {
      getPageNumbers(totalPages - 4, totalPages)
    } else {
      getPageNumbers(currentPage - 2, currentPage + 2)
    }
  }, [currentPage, selectedCity, selectedState])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    handlePageChange(1)
    if (totalPages < 5) {
      setPageNumbers(rangeArr(1, totalPages))
    } else {
      setPageNumbers(rangeArr(1, 5))
    }
  }, [selectedCity, selectedState, totalPages])

  return (
    <div>
      <ul>
        {currentItems.map((item: any) => (
          <StoreItem store={item} />
        ))}
      </ul>
      <div>
        <Pagination
          pageNumbers={pageNumbers}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default StoreList
