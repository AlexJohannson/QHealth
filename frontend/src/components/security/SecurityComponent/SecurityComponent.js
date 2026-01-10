import React, { useEffect, useState } from 'react';
import { PaginationComponent } from "../../PaginationComponent/PaginationComponent";
import { SecurityProfileComponent } from "../SecurityProfileComponent/SecurityProfileComponent";
import { securityService } from "../../../services/securityListService";
import { SecurityFilterComponent } from "../SecurityFilterComponent/SecurityFilterComponent";
import { useSearchParams } from "react-router-dom";
import './SecurityComponent.css';

const SecurityComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 5;
    const filtersFromUrl = {
        success: searchParams.get("success") || "",
        order: searchParams.get("order") || "",
    };
    const [security, setSecurity] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedSecurityId, setSelectedSecurityId] = useState(null);


    const [filters, setFilters] = useState(filtersFromUrl);

    const updateSearchParams = (params) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            Object.entries(params).forEach(([key, value]) => {
                if (value === '' || value === null || value === undefined) {
                    next.delete(key);
                } else {
                    next.set(key, value);
                }
            });

            return next;
        });
    };

    useEffect(() => {
        setFilters(filtersFromUrl);
    }, [searchParams]);


    useEffect(() => {
        const fetchSecurity = async () => {
            setLoading(true);
            try {
                const data = await securityService.getAll({
                    page,
                    size,
                    ...filtersFromUrl,
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
    }, [searchParams]);


    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);

        updateSearchParams({
            ...newFilters,
            page: 1,
            size,
        });
    };

    const handlePageChange = (newPage) => {
        updateSearchParams({
            page: newPage,
            size,
            ...filtersFromUrl,
        });
    };

    const handleSizeChange = (newSize) => {
        updateSearchParams({
            page: 1,
            size: newSize,
            ...filtersFromUrl,
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
                <SecurityFilterComponent
                    filters={filters}
                    onApply={handleFilterApply}
                />
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
                        <img src={'/img/delete.png'} alt={'delete icon'} className="security-delete-icon" />
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