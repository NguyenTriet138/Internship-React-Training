import React from 'react';

type PageNumbersProps = {
  pages: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PageNumbers: React.FC<PageNumbersProps> = ({ pages, currentPage, onPageChange }) => (
  <div id="page-numbers" className="page-numbers">
    {pages.map((pageNum) => (
      <button
        key={pageNum}
        className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
        onClick={() => onPageChange(pageNum)}
      >
        {pageNum}
      </button>
    ))}
  </div>
);

export default PageNumbers;
