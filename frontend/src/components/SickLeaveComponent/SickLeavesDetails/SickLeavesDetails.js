import React, {useEffect, useState} from 'react';
import './SickLeavesDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {sickLeaveService} from "../../../services/sickLeaveService";

const SickLeavesDetails = () => {
    const {id} = useParams();
    const [sickLeave, setSickLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);


    useEffect(() => {
        const fetchSickLeave = async () => {
            try {
                const res = await sickLeaveService.getSickLeaveById(id);
                setSickLeave(res.data);
            } catch (err) {
                setError('Patient Sick Leave Not Found');
            } finally {
                setLoading(false);
            }
        };
        fetchSickLeave()
    }, [id]);

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isAdmin = localStorage.getItem('is_staff') === 'true';

    const canDelete = isSuperUser || isAdmin;

    const handleDelete = async () => {
        try {
            await sickLeaveService.deleteSickLeaveById(id);
            navigate('/sick-leaves');
        } catch (err) {
            setError('Delete Failed');
        }
    };

    if (loading) return (
        <div className="sick-leave-details-skeleton">
            <div className="sick-leave-details-skeleton-avatar"></div>
            <div className="sick-leave-details-skeleton-line short"></div>
            <div className="sick-leave-details-skeleton-line long"></div>
            <div className="sick-leave-details-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;


    return (
        <div className={'patient-sick-leave-detail-container'}>
            <div className={'sick-leave-detail-profile'}>
                <h2>Sick Leave Certificate:</h2>
                <p><strong>Patient Name:</strong> {sickLeave.user.profile.name}</p>
                <p><strong>Patient Surname:</strong> {sickLeave.user.profile.surname}</p>
                <p><strong>Doctor Name:</strong> {sickLeave.doctor.profile.name}</p>
                <p><strong>Doctor Surname:</strong> {sickLeave.doctor.profile.surname}</p>
                <p><strong>Diagnosis:</strong></p>
                <p>{sickLeave.diagnosis}</p>
                <p><strong>Description:</strong></p>
                <p>{sickLeave.description}</p>
                <p><strong>From:</strong> {sickLeave.from_date}</p>
                <p><strong>To:</strong> {sickLeave.to_date}</p>
                {canDelete && (
                    !confirmDelete ? (
                        <button className={'sick-leave-details-delete-button'}
                                onClick={() => setConfirmDelete(true)}>
                            <img src={'/img/delete.png'} alt={'delete'} className="sick-leave-manage-icon" />
                        </button>
                    ) : (
                        <div className={'sick-leave-details-delete-button-confirmation'}>
                            <p className={'sick-leave-details-delete-button-confirmation-error'}>
                                Are you sure you want to delete patient sick leave?
                            </p>

                            {error && (
                                <p className="sick-leave-details-delete-button-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'sick-leave-details-delete-button-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>

                            <button
                                className={'sick-leave-details-delete-button-confirmation-button-cancel'}
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
                <button
                    className={'sick-leave-download-pdf'}
                    onClick={() => window.open(sickLeave.file_url, "_blank")}>
                    <img src={'/img/export-pdf.png'} alt={'download'} className={'sick-leave-manage-icon'}/>
                </button>
            </div>
        </div>
    );
};

export {SickLeavesDetails};