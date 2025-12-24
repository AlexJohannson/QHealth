import React, {useEffect, useState} from 'react';
import {roleService} from "../../../services/roleService";
import {DoctorsProfileComponent} from "../DoctorsProfileComponent/DoctorsProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {DoctorsFilterComponent} from "../DoctorsFilterComponet/DoctorsFilterComponent";
import {useLocation} from "react-router-dom";
import './DoctorsComponent.css';

const DoctorsComponent = () => {
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');



    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const data = await roleService.getListOfDoctors({page, size});
                setDoctors(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load list of doctors');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [page, size]);


    if (loading) return (
        <div className="doctors-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="doctor-skeleton-item">
                    <div className="doctor-skeleton-avatar"></div>
                    <div className="doctor-skeleton-info">
                        <div className="doctor-skeleton-line short"></div>
                        <div className="doctor-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'doctors-component'}>
            <div className={'doctors-component-filter'}>
                <DoctorsFilterComponent onFilter={(params) => {
                    roleService.getListOfDoctors(params).then(res => setDoctors(res.data));
                }}
                />
            </div>
            <div className={'doctors-component-maping'}>
                {doctors.length === 0 ? (
                    <p className={'doctors-component-maping-information'}>No doctors found</p>
                ) : (
                    doctors.map((doctor) => (
                        <DoctorsProfileComponent key={doctor.id} doctor={doctor} patientId={patientId} />
                    ))
                )}
            </div>
            <div className={'doctors-component-pagination'}>
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1)
                                     }}
                />
            </div>
        </div>
    );
};

export {DoctorsComponent};