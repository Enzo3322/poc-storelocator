interface PaginationProps {
  pageNumbers: Array<number>;
  handlePageChange: any;
  currentPage: number;
}
const Pagination = (props: PaginationProps) => {
  const { pageNumbers, handlePageChange, currentPage } = props;
  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
