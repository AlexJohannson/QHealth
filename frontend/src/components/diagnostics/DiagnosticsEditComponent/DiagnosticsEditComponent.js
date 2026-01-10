import React, {useEffect, useState} from 'react';
import './DiagnosticsEditComponent.css';
import {diagnosticsService} from "../../../services/diagnosticsService";

const DiagnosticsEditComponent = ({id}) => {
    const [formData, setFormData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                const res = await diagnosticsService.getDiagnosticsById(id);
                setFormData(res.data);
                setOriginalData(res.data);
            } catch (error) {
                setError('Failed to load diagnostics');
            }
        };
        fetchDiagnostics();
    }, [id]);

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const buildData = () => {
        const data = {};
        if (formData.modality !== originalData.modality) {
            data.modality = formData.modality;
        }
        return data;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');

        const data = buildData();
        if (Object.keys(data).length === 0) {
            setError('No changes to update');
            return;
        }

        try {
            await diagnosticsService.updateDiagnostic(id, data);
            setMessage('Diagnostic updated successfully.');
        } catch (err) {
            setError('Update failed');
        }
    };

    if (!formData) return (
        <div className="diagnostic-edit-skeleton">
            <div className="diagnostic-edit-skeleton-avatar"></div>
            <div className="diagnostic-edit-skeleton-line short"></div>
            <div className="diagnostic-edit-skeleton-line long"></div>
            <div className="diagnostic-edit-skeleton-line long"></div>
        </div>
    );

    return (
        <div className={'diagnostics-edit-component'}>
            {message && <p className={'diagnostics-edit-form-component-message'}>{message}</p>}
            {error && <p className={'diagnostics-edit-form-component-error'}>{error}</p>}
            <form className={'diagnostics-edit-form-component'} onSubmit={handleSubmit}>
                <h5>BLOCK FOR UPDATE MODALITY</h5>
                <input
                    type="text"
                    value={formData.modality || ''}
                    onChange={e => handleChange('modality', e.target.value)}
                    placeholder="Modality"
                />
                <button className={'diagnostics-edit-form-component-button'} type="submit">
                    <img src={'/img/update.png'} alt="update" className={'diagnostics-update-icon'} />
                </button>
            </form>
        </div>
    );
};

export {DiagnosticsEditComponent};