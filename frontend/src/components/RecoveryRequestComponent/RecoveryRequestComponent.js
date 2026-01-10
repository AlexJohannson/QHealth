import React, {useState} from 'react';
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";
import './RecoveryRequestComponent.css';
import {recoveryPasswordEmailValidator} from "../../validator/recoveryPasswordEmailValidator";
import {useNavigate} from "react-router-dom";

const RecoveryRequestComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { error: validationError } = recoveryPasswordEmailValidator.validate(
            email, { abortEarly: false });

        if (validationError) {
            const formattedErrors = {};
            validationError.details.forEach(err => {
                const path = err.path.join(".");
                formattedErrors[path] = err.message;
            });
            setError(formattedErrors.email || "Invalid email");
            return;
        }


        try {
            await apiService.post(urls.auth.recovery, {email});
            setMessage('Email sent. Please check your inbox.');
        } catch (error) {
            setError(error.response?.data?.detail || error.message || 'Something went wrong');
        }
    };


    return (
        <div className={'recovery-request-container'}>
            <div className={'recovery-request-form-div'}>
                <form className={'recovery-request-form'} onSubmit={handleSubmit}>
                    <h2>RECOVERY PASSWORD</h2>
                    {message && <p className={'recovery-request-message'}>{message}</p>}
                    {error && <p className={'recovery-request-error'}>{error}</p>}
                    <input type={'email'} placeholder={'Enter your email'} value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <div className={'recovery-request-button-div'}>
                        <button className={'recovery-request-button'} type="submit">
                            <img src={'/img/link.png'} alt="link icon" className="recovery-icon-page"/>
                        </button>
                        <button className={'recovery-request-button'} type="button" onClick={() => navigate('/login')}>
                            <img src={'/img/left-arrow.png'} alt="back icon" className="recovery-icon-page"/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {RecoveryRequestComponent};