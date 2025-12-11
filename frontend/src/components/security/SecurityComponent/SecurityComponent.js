import React, {useEffect, useState} from 'react';
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {SecurityProfileComponent} from "../SecurityProfileComponent/SecurityProfileComponent";
import {securityService} from "../../../services/securityListService";
import {SecurityFilterComponent} from "../SecurityFilterComponent/SecurityFilterComponent";
import './SecurityComponent.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const SecurityComponent = () => {
    const [security, setSecurity] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSecurityId, setSelectedSecurityId] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSecurity = async () => {
            setLoading(true);
            try {
                const data = await securityService.getAll({page, size});
                setSecurity(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load security list');
            } finally {
                setLoading(false);
            }
        };
        fetchSecurity();
    }, [page, size]);


    if (loading) return (
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
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'security-container'}>
            <div className={'security-container-header'}>
                <img src={'/img/logo.png'} className={'logo-security-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'security-component-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'security-container-filter'}>
                <SecurityFilterComponent onFilter={(params) => {
                    securityService.getAll(params).then(res => setSecurity(res.data));
                }}/>
            </div>
            <div className={'security-container-delete'}>
                {selectedSecurityId && (
                    <button className={'security-container-button-delete'}
                        onClick={async () => {
                            try {
                                await securityService.deleteSecurityById(selectedSecurityId);
                                setSecurity(prev => prev.filter(s => s.id !== selectedSecurityId));
                                setSelectedSecurityId(null);
                            } catch (e) {
                                setError('Could not delete security item');
                            }
                        }}
                    >
                        DELETE SELECTED
                    </button>
                )}
            </div>
            <div className={'security-container-maping'}>
                {security.length === 0 ? (
                    <p className={'security-container-maping-information'}>No security list found.</p>
                ) : (
                    security.map(item => (
                        <SecurityProfileComponent key={item.id} security={item}
                                                  onSelect={() => setSelectedSecurityId(item.id)}
                        />
                    ))
                )}
            </div>
            <div className={'security-container-pagination'}>
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}/>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {SecurityComponent};