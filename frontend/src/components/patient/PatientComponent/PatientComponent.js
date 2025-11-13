import React, {useEffect, useState} from 'react';
import {userService} from "../../../services/userService";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {PatientProfileComponent} from "../PatientProfileComponent/PatientProfileComponent";
import {UsersFilterComponent} from "../../UsersComponent/UserFilterComponent/UserFilterComponent";
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import './PatientComponent.css';

const PatientsComponent = () => {
    const [patients, setPatient] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPatient = async () => {
            setLoading(true);
            try {
                const data = await userService.getAllPatientCard({page, size});
                setPatient(data.data);
                setTotalPage(data.total_page);
            } catch (error) {
                setError('Could not load patient');
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, [page, size]);

    if (loading) return <p>Loading patient...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patients-card-component'}>
             <div className={'patient-component-container-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-component-container'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-component-container-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-card-filter'}>
                <UsersFilterComponent onFilter={(params) => {
                    userService.getAllPatientCard(params).then(res => setPatient(res.data));
                }}
                />
            </div>
            <div className={'patient-card-maping'}>
            {patients.length === 0 ? (
                    <p className={'patient-card-information'}>No patients found.</p>
                ) : (
                    patients.map(patient => (
                        <PatientProfileComponent key={patient.id} patient={patient}/>
                    ))
                )}
            </div>
            <div className={'patient-card-pagination'}>
                <PaginationComponent page={page} totalPages={totalPage} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}
                />
            </div>
            <FooterComponent/>
        </div>
    )
};


export {PatientsComponent};