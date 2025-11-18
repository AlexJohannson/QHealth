import React, {useEffect, useState} from 'react';
import './PatientJournalDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {patientJournal} from "../../../services/patientJournal";
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const PatientJournalDetails = () => {
    const {id} = useParams();
    const [patientsJournals, setPatientsJournals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPatientJournalDetails = async () => {
            try {
                const res = await patientJournal.getPatientJournalById(id);
                setPatientsJournals(res.data);
            } catch (error) {
                setError('Patient Journal not found');
            } finally {
                setLoading(false);
            }
        };
        fetchPatientJournalDetails();
    }, [id]);


    const isSuperUser =localStorage.getItem('is_superuser') === 'true';
    const isAdmin = localStorage.getItem('is_staff') === 'true';

     const canDelete = isSuperUser || isAdmin;


    const handleDelete = async () => {
        try {
            await patientJournal.deletePatientJournal(id);
            navigate(-1);
        } catch (err) {
            setError('Delete failed');
        }
    }

    if (loading) return <p>Loading diagnostic...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patient-journal-details'}>
            <div className={'patient-journal-details-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-journal-detail-header'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-journal-detail-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-journal-details-profile'}>
                <h2>My Journal:</h2>
                <p>Number: {patientsJournals.id}</p>
                <p>Diagnosis: {patientsJournals.diagnosis}</p>
                <p>Description: {patientsJournals.description}</p>
                <p>Planning: {patientsJournals.planning}</p>
            </div>
            {canDelete && (
                <button className={'patient-journal-details-button-delete'}
                        onClick={handleDelete}>Delete Journal</button>
            )}
            <FooterComponent/>
        </div>
    );
};

export {PatientJournalDetails};