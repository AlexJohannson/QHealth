import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {diagnosticsService} from "../../../services/diagnosticsService";
import {DiagnosticsEditComponent} from "../DiagnosticsEditComponent/DiagnosticsEditComponent";
import {BookDiagnosticComponent} from "../../booking-diagnostics/BookDiagnosticComponent/BookDiagnosticComponent";
import './DiagnosticsDetailComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";


const DiagnosticsDetailComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [diagnostic, setDiagnostic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);

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
        setDeleting(true);
        try {
            await diagnosticsService.deleteDiagnostic(id);
            navigate('/diagnostics');
        } catch (error) {
            setError('Failed to delete diagnostic');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p>Loading diagnostic...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'diagnostics-detail-component'}>
            <div className={'diagnostic-detail-component-header'}>
                <img src={'/img/logo.png'} className={'logo-diagnostic-detail-component'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'diagnostics-detail-component-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'diagnostics-detail-component-content'}>
                <h4>{diagnostic.modality}</h4>
                <p>ID: {diagnostic.id}</p>
                <p>Created: {diagnostic.created_at}</p>
                <p>Updated: {diagnostic.updated_at}</p>
            </div>
            {canCreate && (
                <div className={'diagnostics-detail-component-content-delete'}>
                    <h5>BLOCK FOR DELETE MODALITY</h5>
                    <button
                        className={'diagnostics-detail-component-content-delete-button'}
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete Diagnostic'}
                    </button>
                </div>
            )}
            {canCreate && (
                <div className={'diagnostics-detail-component-edit-form'}>
                    <DiagnosticsEditComponent id={id}/>
                </div>
            )}
            <div className={'diagnostics-detail-component-booking-form'}>
                <BookDiagnosticComponent id={id}/>
            </div>
            <FooterComponent/>
        </div>
    )

};

export {DiagnosticsDetailComponent};