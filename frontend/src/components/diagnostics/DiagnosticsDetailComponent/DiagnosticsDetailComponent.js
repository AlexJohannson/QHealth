import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {diagnosticsService} from "../../../services/diagnosticsService";
import {BookDiagnosticComponent} from "../../booking-diagnostics/BookDiagnosticComponent/BookDiagnosticComponent";
import './DiagnosticsDetailComponent.css';
import {formatDate} from "../../../untils/formatDate";


const DiagnosticsDetailComponent = () => {
    const {id} = useParams();
    const [diagnostic, setDiagnostic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


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



    if (loading) return (
        <div className="diagnostic-list-profile-skeleton">
            <div className="diagnostic-list-profile-skeleton-avatar"></div>
            <div className="diagnostic-list-profile-skeleton-line short"></div>
            <div className="diagnostic-list-profile-skeleton-line long"></div>
            <div className="diagnostic-list-profile-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'diagnostics-detail-component'}>
            <div className={'diagnostics-detail-component-content'}>
                <h4>{diagnostic.modality}</h4>
                <p><strong>Number:</strong> {diagnostic.id}</p>
                <p><strong>Created:</strong> {formatDate(diagnostic.created_at)}</p>
                <p><strong>Updated:</strong> {formatDate(diagnostic.updated_at)}</p>
            </div>
            <div className={'diagnostics-detail-component-booking-form'}>
                <BookDiagnosticComponent id={id}/>
            </div>
        </div>
    )

};

export {DiagnosticsDetailComponent};