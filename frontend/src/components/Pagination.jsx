import React from "react";
import { Button } from "./UI/button.jsx";

export function Pagination({ totalRecords, limit, onPageChange, offset }) {
  const totalPages = Math.ceil(totalRecords / limit);
  const pageNumbers = [];
  const currentPage = offset / limit + 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination flex justify-between mt-4">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Anterior
      </Button>
      <div className="flex gap-1">
        {pageNumbers.map((pageNumber, index) => (
          <Button
            variant="outline"
            key={index}
            onClick={() => handlePageClick(pageNumber)}
          >
            {`${pageNumber}`}
          </Button>
        ))}
      </div>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Siguiente
      </Button>
    </div>
  );
}


