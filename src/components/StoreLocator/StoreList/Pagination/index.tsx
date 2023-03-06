import { useContext } from 'react'
import { StoreContext } from '../../../../context'

const Pagination = () => {
  const { pageNumbers, handlePageChange, currentPage } =
    useContext<any>(StoreContext)

  return (
    <div>
      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}

export default Pagination
