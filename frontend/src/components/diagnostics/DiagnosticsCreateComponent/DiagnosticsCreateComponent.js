import React, {useState} from 'react';
import './DiagnosticsCreateComponent.css';
import {useNavigate} from "react-router-dom";
import {diagnosticsService} from "../../../services/diagnosticsService";
import {createDiagnosticValidator} from "../../../validator/createDiagnosticValidator";


const DiagnosticsCreateComponent = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        modality: '',
    });
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError({});
        setSuccess(false);

        const {error: validationError} = createDiagnosticValidator.validate(form, {abortEarly: false});

        if (validationError) {
            const errors = {};

            validationError.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            setError(errors);
            return;
        }

        try {
            await diagnosticsService.createNewDiagnostic({
                modality: form.modality,
            })
            setSuccess(true);
            navigate("/diagnostics-list");
        } catch (err) {
            if (err.response?.data) {
                const normalized = {};
                Object.entries(err.response.data).forEach(([key, value]) => {
                    normalized[key.toLowerCase()] = Array.isArray(value) ? value.join(' ') : value;
                });
                setError(normalized);
            } else {
                setError({general: 'Something went wrong, please try again later'});
            }
        }
    }


    return (
        <div className={'diagnostics-create-component'}>
            <div className={'diagnostics-create-component-content'}>
                {success ? (
                    <p className={'diagnostics-component-container-information'}>Registration new diagnostic successful.</p>
                ) : (
                    <form className={'diagnostics-create-component-form'} onSubmit={handleSubmit}>
                        <h2>REGISTER NEW DIAGNOSTIC</h2>
                        <input name={'modality'} placeholder={'Modality'} onChange={handleChange}
                               value={form.modality}/>
                        {error.modality && (<p className={'diagnostics-create-component-form-error'}>{error.modality}</p>)}
                        {error.general && (<p className={'diagnostics-create-component-form-error'}>{error.general}</p>)}
                        <button className={'diagnostics-create-component-form-button'} type={'submit'}>REGISTER</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export {DiagnosticsCreateComponent};