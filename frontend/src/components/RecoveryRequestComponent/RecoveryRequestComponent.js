import React, {useState} from 'react';
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";
import './RecoveryRequestComponent.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../FooterComponent/FooterComponent";

const RecoveryRequestComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await apiService.post(urls.auth.recovery, {email});
            setMessage('Email sent. Please check your inbox.');
        } catch (error) {
            setError(error.response?.data?.detail || error.message || 'Something went wrong');
        }
    };



    return (
        <div className={'recovery-request-container'}>
            <div className={'recovery-request-container-header'}>
                <img src={'/img/logo.png'} className={'logo-recovery-request'} alt="Logo"/>
                <h1>QHealth</h1>
            </div>
            <div className={'recovery-request-form-div'}>
                <form className={'recovery-request-form'} onSubmit={handleSubmit}>
                    <h2>RECOVERY PASSWORD</h2>
                    {message && <p className={'recovery-request-message'}>{message}</p>}
                    {error && <p className={'recovery-request-error'}>{error}</p>}
                    <input type={'email'} placeholder={'Enter your email'} value={email}
                           onChange={e => setEmail(e.target.value)} />
                    <div className={'recovery-request-button-div'}>
                    <button className={'recovery-request-button'} type="submit">Send Recovery Link</button>
                    <button className={'recovery-request-button'} onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </form>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {RecoveryRequestComponent};