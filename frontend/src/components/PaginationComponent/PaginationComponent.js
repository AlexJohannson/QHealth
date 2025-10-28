import React from 'react';

const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  return (
    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>

      <span>Page {page} of {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export { PaginationComponent };