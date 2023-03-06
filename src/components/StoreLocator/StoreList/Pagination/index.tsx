import { useContext } from 'react'
import { StoreContext, IStoreContext } from '../../../../context'

const Pagination = () => {
  const { pageNumbers, handlePageChange, currentPage } = useContext(
    StoreContext
  ) as IStoreContext

  return (
    <div>
      {pageNumbers.map((pageNumber: any) => (
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
