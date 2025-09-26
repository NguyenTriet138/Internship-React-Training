import React from 'react';
import PaginationInfo from '@components/Pagination/PaginationInfo';
import ItemsPerPageSelect from '@components/Pagination/ItemsPerPage';
import PaginationControls from '@components/Pagination/PaginationControls';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <PaginationInfo startItem={startItem} endItem={endItem} totalItems={totalItems} />

      <div className="pagination-controls">
        <ItemsPerPageSelect itemsPerPage={itemsPerPage} onChange={onItemsPerPageChange} />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          pages={generatePageNumbers()}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
