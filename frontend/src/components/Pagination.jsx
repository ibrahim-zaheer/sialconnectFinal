// import React from 'react';
// import PropTypes from 'prop-types';

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   maxVisiblePages = 5,
//   className = ''
// }) => {
//   const getPageNumbers = () => {
//     const half = Math.floor(maxVisiblePages / 2);
//     let start = Math.max(1, currentPage - half);
//     let end = Math.min(totalPages, start + maxVisiblePages - 1);

//     // Adjust if we're at the end
//     if (end - start + 1 < maxVisiblePages) {
//       start = Math.max(1, end - maxVisiblePages + 1);
//     }

//     const pages = [];
//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className={`flex items-center justify-center space-x-2 ${className}`}>
//       {/* First & Previous buttons */}
//       <button
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         &laquo;
//       </button>
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         &lsaquo;
//       </button>

//       {/* Page numbers */}
//       {getPageNumbers().map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-3 py-1 rounded border ${
//             currentPage === page
//               ? 'bg-blue-500 text-white border-blue-500'
//               : 'hover:bg-gray-100'
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       {/* Next & Last buttons */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         &rsaquo;
//       </button>
//       <button
//         onClick={() => onPageChange(totalPages)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         &raquo;
//       </button>

//       {/* Optional page info */}
//       <span className="text-sm text-gray-600 ml-2">
//         Page {currentPage} of {totalPages}
//       </span>
//     </div>
//   );
// };

// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   maxVisiblePages: PropTypes.number,
//   className: PropTypes.string
// };

// export default Pagination;

// components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="w-full flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-white text-primary-600 border-primary-600 disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-3 py-1 border rounded ${
            currentPage === pageNumber
              ? "bg-primary-600 text-white"
              : "bg-white text-primary-600 border-primary-600"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-white text-primary-600 border-primary-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
