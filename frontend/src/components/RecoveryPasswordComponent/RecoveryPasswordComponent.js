import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";
import './RecoveryPasswordComponent.css';
import {FooterComponent} from "../FooterComponent/FooterComponent";
import {recoveryPasswordValidator} from "../../validator/recoveryPasswordValidator";

const RecoveryPasswordComponent = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        const {error: validationError} = recoveryPasswordValidator.validate(
            {password, confirmPassword},
            {abortEarly: false}
        );

        if (validationError) {
            const formattedErrors = {};
            validationError.details.forEach(err => {
                const path = err.path.join(".");
                formattedErrors[path] = err.message;
            });
            setError(formattedErrors);
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append('password', password);

            await apiService.post(urls.auth.recoveryPassword(token), formData, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            });

            navigate('/login');
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            } else {
                setError({general: 'Something went wrong, please try again later.'});
            }
        }
    };

    const togglePassword = () => setShowPassword(prev => !prev);


    return (
        <div className={'recovery-password-container'}>
            <div className={'recovery-password-container-header'}>
                <img src={'/img/logo.png'} className={'logo-recovery-password'} alt="Logo"/>
                <h1>QHealth</h1>
            </div>
            <div className={'recovery-password-form-div'}>
                <form className={'recovery-password-form'} onSubmit={handleSubmit}>
                    <h2>SET NEW PASSWORD</h2>
                    {error.password && (<p className={'recovery-password-error'}>{error.password}</p>)}
                    {error.confirmPassword && (<p className="recovery-password-error">{error.confirmPassword}</p>)}
                    {error.general && (<p className={'recovery-password-error'}>{error.general}</p>)}
                    <div className={'new-password-recovery'}>
                        <input type={showPassword ? 'text' : 'password'}
                               placeholder={'Enter your new password'}
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <button className={'show-new-password-recovery'} type="button" onClick={togglePassword}
                        >{showPassword ? '👁️' : '🙈'}</button>
                    </div>
                    <div className={'new-password-recovery-confirm'}>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Confirm your new password"
                               value={confirmPassword}
                               onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button className={'show-new-password-recovery-confirm'} type="button" onClick={togglePassword}
                        >{showPassword ? '👁️' : '🙈'}</button>
                    </div>
                    <button className={'recovery-password-button'} type="submit">Reset Password</button>
                </form>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {RecoveryPasswordComponent};