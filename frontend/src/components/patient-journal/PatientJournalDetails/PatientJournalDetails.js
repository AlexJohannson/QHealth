import React, {useEffect, useState} from 'react';
import './PatientJournalDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {patientJournal} from "../../../services/patientJournal";
import {formatDate} from "../../../untils/formatDate";

const PatientJournalDetails = () => {
    const {id} = useParams();
    const [patientsJournals, setPatientsJournals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);


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
            navigate('/patient-journal');
        } catch (err) {
            setError('Delete failed');
        }
    }

    if (loading) return (
        <div className="patient-journal-details-skeleton">
            <div className="patient-journal-details-skeleton-avatar"></div>
            <div className="patient-journal-details-skeleton-line short"></div>
            <div className="patient-journal-detail-skeleton-line long"></div>
            <div className="patient-journal-details-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patient-journal-details'}>
            <div className={'patient-journal-details-profile'}>
                <h2>My Journal:</h2>
                <p><strong>Number:</strong> {patientsJournals.id}</p>
                <p><strong>Diagnosis:</strong></p>
                <p>{patientsJournals.diagnosis}</p>
                <p><strong>Description:</strong></p>
                <p>{patientsJournals.description}</p>
                <p><strong>Planning:</strong></p>
                <p>{patientsJournals.planning}</p>
                <p><strong>Create:</strong> {formatDate(patientsJournals.created_at)}</p>
                <h3>Patient:</h3>
                <p><strong>Name:</strong> {patientsJournals.user.profile.name}</p>
                <p><strong>Surname:</strong> {patientsJournals.user.profile.surname}</p>
            </div>
            {canDelete && (
                !confirmDelete ? (
                         <button className={'patient-journal-details-button-delete'}
                         onClick={() => setConfirmDelete(true)}>
                             <img src={'/img/delete.png'} alt={'delete'} className={'patient-journal-delete-icon'} />
                         </button>
                    ) : (
                        <div className={'patient-journal-details-button-delete-confirmation'}>
                            <p className={'patient-journal-details-button-delete-confirmation-error'}>
                                Are you sure you want to delete patient journal?
                            </p>

                            {error && (
                                <p className="patient-journal-details-button-delete-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'patient-journal-details-button-delete-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>

                            <button
                                className={'patient-journal-details-button-delete-confirmation-button-cancel'}
                                type="button"
                                onClick={() => {
                                    setConfirmDelete(false);
                                    setError('');
                                }}
                            >
                                No, cancel
                            </button>
                        </div>
                    )
            )}
        </div>
    );
};

export {PatientJournalDetails};
