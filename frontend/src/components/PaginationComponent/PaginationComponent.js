import React from 'react';
import './PaginationComponent.css';

const PaginationComponent = ({page, totalPages, onPageChange, size, onSizeChange}) => {
    return (
        <div className="pagination-component">
            <button className={'pagination-button'} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                Prev
            </button>


            <button className={'pagination-button'} disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                Next
            </button>
            <select value={size} onChange={(e) => onSizeChange(Number(e.target.value))}>
                {[5, 10, 15, 20, 25].map((s) => (
                <option key={s} value={s}>{s} per page</option>
                ))}
            </select>
        </div>
    );
};

export {PaginationComponent};