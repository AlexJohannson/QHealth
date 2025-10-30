import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";

const RecoveryPasswordComponent = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const formData = new URLSearchParams();
            formData.append('password', password);

            await apiService.post(urls.auth.recoveryPassword(token), formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.detail || error.message || 'Something went wrong');
        }
    };



    return (
        <div>
            <div>
                <h4>Set New Password</h4>
                <form onSubmit={handleSubmit}>
                    <input type={'password'} placeholder={'Enter your new password'} value={password}
                    onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Reset Password</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export {RecoveryPasswordComponent};