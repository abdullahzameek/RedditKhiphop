import React from 'react';
import "./style.css";

const Pagination = ({ linksPerPage, totalLinks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{left: '40%', position: "relative", fontSize:"24px"}}>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;