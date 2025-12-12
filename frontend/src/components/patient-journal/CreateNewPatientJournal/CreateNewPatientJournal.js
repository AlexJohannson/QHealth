import React, {useState} from 'react';
import './CreateNewPatientJournal.css';
import {useLocation, useNavigate} from "react-router-dom";
import {patientJournal} from "../../../services/patientJournal";
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {journalValidator} from "../../../validator/journalValidator";

const CreateNewPatientJournal = ({patientId}) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [description, setDescription] = useState('');
    const [planning, setPlanning] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientIdFromUrl = searchParams.get('patientId');

    const userId = patientId
        ? Number(patientId)
        : patientIdFromUrl
            ? Number(patientIdFromUrl)
            : Number(localStorage.getItem('userId'));

    const handleBooking = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        const data = {
            user_id: userId,
            diagnosis,
            description,
            planning,
        };

        const {error: validationError} = journalValidator.validate(data, {abortEarly: false});

        if (validationError) {
            const errors = {};

            validationError.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });

            setFieldErrors(errors);
            setLoading(false);
            return;
        }


        try {
            await patientJournal.createNewPatientJournal(data);
            setSuccess(true);
            setDiagnosis('');
            setDescription('');
            setPlanning('');
        } catch (error) {
            setError('Journal should be filled');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="create-journal-form">
            <div className={'create-journal-form-header'}>
                <img src={'/img/logo.png'} className={'logo-create-journal-form'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'create-journal-form-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'create-journal-form'}>
                <h3>Create New Patient Journal</h3>

                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>Journal created successfully</p>}

                <div className={'create-journal-form-diagnosis'}>
                    <label>Diagnosis:</label>
                    {fieldErrors.diagnosis && <p style={{color: 'red'}}>{fieldErrors.diagnosis}</p>}
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                    />
                </div>

                <div className={'create-journal-form-description'}>
                    <label>Description:</label>
                    {fieldErrors.description && <p style={{color: 'red'}}>{fieldErrors.description}</p>}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className={'create-journal-form-planning'}>
                    <label>Planning:</label>
                    {fieldErrors.planning && <p style={{color: 'red'}}>{fieldErrors.planning}</p>}
                    <textarea
                        value={planning}
                        onChange={(e) => setPlanning(e.target.value)}
                    />
                </div>

                <button className={'create-journal-form-button-create'} onClick={handleBooking} disabled={loading}>
                    {loading ? 'Saving...' : 'Create Journal'}
                </button>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {CreateNewPatientJournal};