import React from "react";
import "./PaginationComponent.css";

const PaginationComponent = ({page, totalPages, onPageChange, size, onSizeChange}) => {

    const createPageNumbers = () => {
        const pages = [];

        if (page > 3) {
            pages.push(1);
        }

        if (page > 4) {
            pages.push("left-ellipsis");
        }

        for (let p = page - 2; p <= page + 2; p++) {
            if (p > 0 && p <= totalPages) {
                pages.push(p);
            }
        }


        if (page < totalPages - 3) {
            pages.push("right-ellipsis");
        }


        if (page < totalPages - 2) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = createPageNumbers();

    return (
        <div className="pagination-component">
            <div className={'pagination-component-pagination'}>


                <button
                    className="pagination-button"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    {"<"}
                </button>


                {pages.map((p, index) => {
                    if (p === "left-ellipsis" || p === "right-ellipsis") {
                        return (
                            <span key={index} className="pagination-ellipsis">
                            ...
                        </span>
                        );
                    }

                    return (
                        <button
                            key={index}
                            className={`pagination-page ${p === page ? "active" : ""}`}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    );
                })}


                <button
                    className="pagination-button"
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    {">"}
                </button>


                <select
                    className={'select-size-page'}
                    value={size}
                    onChange={(e) => onSizeChange(Number(e.target.value))}
                >
                    {[5, 10, 15, 20, 25].map((s) => (
                        <option key={s} value={s}>
                            {s} per page
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export {PaginationComponent};