import React, {useEffect, useState} from 'react';
import './DiagnosticsListDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {diagnosticsService} from "../../../services/diagnosticsService";
import {DiagnosticsEditComponent} from "../../diagnostics/DiagnosticsEditComponent/DiagnosticsEditComponent";
import {formatDate} from "../../../untils/formatDate";


const DiagnosticsListDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [diagnostic, setDiagnostic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                const res = await diagnosticsService.getDiagnosticsById(id);
                setDiagnostic(res.data);
            } catch (error) {
                setError('Diagnostic not found');
            } finally {
                setLoading(false);
            }
        };
        fetchDiagnostics();
    }, [id]);

    const isSuperUser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';

    const canCreate = isSuperUser || isStaff;

    const handleDelete = async () => {
        try {
            await diagnosticsService.deleteDiagnostic(id);
            setConfirmDelete(false);
            navigate('/diagnostics-list');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Failed to delete diagnostic';
            setError(msg);
        }
    };


    if (loading) return (
        <div className="diagnostic-profile-skeleton">
            <div className="diagnostic-profile-skeleton-avatar"></div>
            <div className="diagnostic-profile-skeleton-line short"></div>
            <div className="diagnostic-profile-skeleton-line long"></div>
            <div className="diagnostic-profile-skeleton-line long"></div>
        </div>
    );


    return (
        <div className={'diagnostics-list-detail-component'}>
            <div className={'diagnostics-list-detail-component-content'}>
                <h4>{diagnostic.modality}</h4>
                <p><strong>Number:</strong> {diagnostic.id}</p>
                <p><strong>Created:</strong> {formatDate(diagnostic.created_at)}</p>
                <p><strong>Updated:</strong> {formatDate(diagnostic.updated_at)}</p>
            </div>
            {canCreate && (
                <div className={'diagnostics-list-detail-component-content-delete'}>
                    <h5>BLOCK FOR DELETE MODALITY</h5>
                    {!confirmDelete ? (
                        <button
                            className={'diagnostics-list-detail-component-content-delete-button'}
                            onClick={() => setConfirmDelete(true)}
                        >
                            Delete
                        </button>
                    ) : (
                        <div className={'diagnostics-list-detail-component-content-delete-confirmation'}>
                            <p className={'diagnostics-list-detail-component-content-delete-confirmation-error'}>
                                Are you sure you want to delete diagnostic modality?
                            </p>

                            {error && (
                                <p className="diagnostics-list-detail-component-content-delete-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'diagnostics-list-detail-component-content-delete-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className={'diagnostics-list-detail-component-content-delete-confirmation-button-cancel'}
                                type="button"
                                onClick={() => {
                                    setConfirmDelete(false);
                                    setError('');
                                }}
                            >
                                No, cancel
                            </button>
                        </div>
                    )}
                </div>
            )}
            {canCreate && (
                <div className={'diagnostics-list-detail-component-edit-form'}>
                    <DiagnosticsEditComponent id={id}/>
                </div>
            )}
        </div>
    )
};

export {DiagnosticsListDetails};