import Pagination from './Pagination'
import StoreItem from './StoreItem'
import { rangeArr } from '../../../utils/rangeArr'
import { StoreContext, IStoreContext } from '../../../context'

import { useEffect, useContext } from 'react'

const StoreList = () => {
  const {
    selectedCity,
    selectedState,
    currentPage,
    setPageNumbers,
    handlePageChange,
    totalPages,
    currentItems
  } = useContext(StoreContext) as IStoreContext

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
        <Pagination />
      </div>
    </div>
  )
}

export default StoreList
