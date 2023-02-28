import Pagination from "./Pagination";
import StoreItem from "./StoreItem";

interface StoreListProps {
  stores: Record<string, string>[];
  selectedCity?: string;
  selectedState?: string;
}

import React, { useState } from "react";

const StoreList = (props: StoreListProps) => {
  const { stores } = props;
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
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // função para mudar a página atual
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
