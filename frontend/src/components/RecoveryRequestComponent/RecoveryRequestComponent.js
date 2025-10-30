import React, {useState} from 'react';
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";

const RecoveryRequestComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        <div>
            <div>
                <h4>Recovery Password</h4>
                <form onSubmit={handleSubmit}>
                    <input type={'email'} placeholder={'Enter your email'} value={email}
                           onChange={e => setEmail(e.target.value)} />
                    <button type="submit">Send Recovery Link</button>
                </form>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export {RecoveryRequestComponent};