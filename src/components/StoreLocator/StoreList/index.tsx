import Pagination from "./Pagination";
import StoreItem from "./StoreItem";
import { rangeArr } from "../../../utils/rangeArr";

interface StoreListProps {
  stores: Record<string, string>[];
  selectedCity?: string;
  selectedState?: string;
}

import React, { useEffect, useState } from "react";

const StoreList = (props: StoreListProps) => {
  const { stores, selectedCity, selectedState } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // calcular o índice do primeiro item da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // definir os itens que serão renderizados na página atual
  const currentItems = stores.slice(indexOfFirstItem, indexOfLastItem);

  // calcular o número total de páginas
  const totalPages = Math.ceil(stores.length / itemsPerPage);

  // criar uma lista de números de página para a paginação

  const [pageNumbers, setPageNumbers] = useState(totalPages <= 5 ? rangeArr(1, totalPages) : rangeArr(1, 5))

  useEffect(() => {
    if (currentPage > 3 && currentPage < totalPages - 2) {
      setPageNumbers(rangeArr(currentPage - 2, currentPage + 2))
    }
    if (currentPage === totalPages - 1 && currentPage === totalPages - 2) {
      setPageNumbers(rangeArr(totalPages - 4, totalPages))
    }
    console.log(currentPage, pageNumbers)
  }, [currentPage])


  // função para mudar a página atual
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    handlePageChange(1)
  }, [selectedCity, selectedState])

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
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
  );
};

export default StoreList;
