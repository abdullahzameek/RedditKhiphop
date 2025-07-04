import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const Pagination = ({ linksPerPage, totalLinks, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalLinks / linksPerPage);

  // Don't render pagination if there's only one page or no content
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which page numbers to show
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      paginate(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className="pagination-container">
      <div className="pagination-info">
        Showing {((currentPage - 1) * linksPerPage) + 1} to {Math.min(currentPage * linksPerPage, totalLinks)} of {totalLinks} tracks
      </div>
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="page-link"
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>

        {/* First page with ellipsis */}
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button onClick={() => handlePageClick(1)} className="page-link">
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="page-item disabled">
                <span className="page-link ellipsis">...</span>
              </li>
            )}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button 
              onClick={() => handlePageClick(number)} 
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}

        {/* Last page with ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link ellipsis">...</span>
              </li>
            )}
            <li className="page-item">
              <button onClick={() => handlePageClick(totalPages)} className="page-link">
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="page-link"
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  linksPerPage: PropTypes.number.isRequired,
  totalLinks: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;