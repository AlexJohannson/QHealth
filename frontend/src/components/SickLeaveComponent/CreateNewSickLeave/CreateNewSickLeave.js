import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {sickLeaveService} from "../../../services/sickLeaveService";
import {sickLeavesValidator} from "../../../validator/sickLeavesValidator";
import './CreateNewSickLeave.css';


const CreateNewSickLeave = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const patientIdFromUrl = searchParams.get('patientId');
    const doctorIdFromUrl = searchParams.get('doctorId');

    const userId = Number(patientIdFromUrl);
    const doctorId = Number(doctorIdFromUrl);

    const [diagnosis, setDiagnosis] = useState('');
    const [description, setDescription] = useState('');
    const [from_date, setFrom_date] = useState('');
    const [to_date, setTo_date] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState({});

    const handleCreateSickLeave = async () => {
        setLoading(true);
        setError({});
        setSuccess(false);

        const data = {
            user_id: userId,
            doctor_id: doctorId,
            diagnosis,
            description,
            from_date,
            to_date,
        };

        const {error: validationError} = sickLeavesValidator.validate(data, {abortEarly: false});

        if (validationError) {
            const errors = {};

            validationError.details.forEach(err => {
                const field = err.path[0];
                errors[field] = err.message;
            });

            setError(errors);
            setLoading(false);
            return;
        }

        try {
            await sickLeaveService.createNewSickLeave(data);
            setSuccess(true);
            setDiagnosis('');
            setDescription('');
            setFrom_date('');
            setTo_date('');
        } catch (err) {
            setError({general: 'Failed to create sick leave'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-sick-leave-container">
            <div className={'form-group-sick'}>
                {error.general && <p style={{color: 'red'}}>{error.general}</p>}
                {error.diagnosis && <p style={{color: 'red'}}>{error.diagnosis}</p>}
                {error.description && <p style={{color: 'red'}}>{error.description}</p>}
                {error.from_date && <p style={{color: 'red'}}>{error.from_date}</p>}
                {error.to_date && <p style={{color: 'red'}}>{error.to_date}</p>}
                {success && <p style={{color: 'green'}}>Sick leave created successfully</p>}
                <h2>Create New Sick Leave</h2>

                <div className="form-group-sick-leave-diagnosis">
                    <label>Diagnosis:</label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                    />
                </div>

                <div className="form-group-sick-leave-description">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group-sick-leave-date">
                    <label>From date:</label>
                    <input
                        type="date"
                        value={from_date}
                        onChange={(e) => setFrom_date(e.target.value)}
                    />
                </div>

                <div className="form-group-sick-leave-date">
                    <label>To date:</label>
                    <input
                        type="date"
                        value={to_date}
                        onChange={(e) => setTo_date(e.target.value)}
                    />
                </div>

                <button
                    className={'create-sick-leave-button'}
                    onClick={handleCreateSickLeave}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Sick Leave"}
                </button>
            </div>
        </div>
    );
};

export {CreateNewSickLeave};