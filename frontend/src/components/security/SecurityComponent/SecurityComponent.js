import React, { useEffect, useState } from 'react';
import { PaginationComponent } from "../../PaginationComponent/PaginationComponent";
import { SecurityProfileComponent } from "../SecurityProfileComponent/SecurityProfileComponent";
import { securityService } from "../../../services/securityListService";
import { SecurityFilterComponent } from "../SecurityFilterComponent/SecurityFilterComponent";
import { useSearchParams } from "react-router-dom";
import './SecurityComponent.css';

const SecurityComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [size, setSize] = useState(Number(searchParams.get("size")) || 5);
    const [filters, setFilters] = useState({
        success: searchParams.get("success") || "",
        order: searchParams.get("order") || "",
    });
    const [security, setSecurity] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSecurityId, setSelectedSecurityId] = useState(null);


    const updateQueryParams = (params) => {
        const cleaned = {};

        Object.entries(params).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                cleaned[key] = value;
            }
        });

        setSearchParams(cleaned);
    };


    useEffect(() => {
        const fetchSecurity = async () => {
            setLoading(true);
            try {
                const data = await securityService.getAll({
                    page,
                    size,
                    ...filters,
                });

                setSecurity(data.data);
                setTotalPages(data.total_pages);
            } catch (err) {
                setError("Could not load security list");
            } finally {
                setLoading(false);
            }
        };

        fetchSecurity();
    }, [page, size, filters]);


    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setPage(1);

        updateQueryParams({
            page: 1,
            size,
            ...newFilters,
        });
    };


    const handlePageChange = (newPage) => {
        setPage(newPage);

        updateQueryParams({
            page: newPage,
            size,
            ...filters,
        });
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(1);

        updateQueryParams({
            page: 1,
            size: newSize,
            ...filters,
        });
    };


    if (loading) {
        return (
            <div className="security-skeleton-container">
                {[...Array(size)].map((_, idx) => (
                    <div key={idx} className="security-skeleton-item">
                        <div className="security-skeleton-avatar"></div>
                        <div className="security-skeleton-info">
                            <div className="security-skeleton-line short"></div>
                            <div className="security-skeleton-line long"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="security-container">
            <div className="security-container-filter">
                <SecurityFilterComponent onFilter={handleFilter} />
            </div>

            <div className="security-container-delete">
                {selectedSecurityId && (
                    <button
                        className="security-container-button-delete"
                        onClick={async () => {
                            try {
                                await securityService.deleteSecurityById(selectedSecurityId);
                                setSecurity(prev => prev.filter(s => s.id !== selectedSecurityId));
                                setSelectedSecurityId(null);
                            } catch (e) {
                                setError("Could not delete security item");
                            }
                        }}
                    >
                        DELETE SELECTED
                    </button>
                )}
            </div>

            <div className="security-container-maping">
                {security.length === 0 ? (
                    <p className="security-container-maping-information">No security list found.</p>
                ) : (
                    security.map(item => (
                        <SecurityProfileComponent
                            key={item.id}
                            security={item}
                            onSelect={() => setSelectedSecurityId(item.id)}
                        />
                    ))
                )}
            </div>

            <div className="security-container-pagination">
                <PaginationComponent
                    page={page}
                    totalPages={totalPages}
                    size={size}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                />
            </div>
        </div>
    );
};

export { SecurityComponent };