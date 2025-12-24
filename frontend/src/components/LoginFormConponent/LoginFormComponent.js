import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {authService} from '../../services/authService';
import './LoginFormComponent.css';
import {emailValidator} from "../../validator/emailValidator";

const LoginFormComponent = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async user => {
        setError('');
        setMessage('');


        const {error: validationError} = emailValidator.validate(user.email);
        if (validationError) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            await authService.login(user);
            const {data} = await authService.getMe();


            localStorage.setItem('userId', data.id);
            localStorage.setItem('role', data.role);
            localStorage.setItem('roleId', data.role_id);
            localStorage.setItem('is_superuser', data.is_superuser);
            localStorage.setItem('is_staff', data.is_staff);
            localStorage.setItem('is_user', data.is_user);
            window.dispatchEvent(new Event("authChanged"));


            let path = '/login';
            if (data.is_superuser) path = '/superuser';
            else if (data.is_staff) path = '/admin';
            else if (data.role === 'doctor') path = '/doctor';
            else if (data.role === 'operator') path = '/operator';
            else if (data.role === 'pharmacist') path = '/pharmacist';
            else if (data.is_user) path = '/user-home-page';

            navigate(path);
        } catch (e) {
            setError(e.response?.data?.detail || e.message || 'Something went wrong');
        }
    };

    const togglePassword = () => setShowPassword(prev => !prev);

    return (
        <div className={'login-container'}>
            <div className={'login-form-div'}>
                <form className={'form-login'} onSubmit={handleSubmit(onSubmit)}>
                    <h2>LOGIN</h2>
                    {error && <p className={'form-login-error'}>{error}</p>}
                    {message && <p className={'form-message'}>{message}</p>}
                    <input
                        type="text"
                        placeholder="Email"
                        {...register('email', {required: 'Email is required'})}
                    />
                    {errors.email && (<p className="form-login-error">{errors.email.message}</p>)}
                    <div className={'login-password'}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('password', {required: 'Password is required'})}
                        />
                        <button
                            className={'show-password-login'}
                            type="button"
                            onClick={togglePassword}
                        >
                            {showPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                    {errors.password && (<p className="form-login-error">{errors.password.message}</p>)}
                    <div className={'form-login-button-div'}>
                        <button className={'form-login-button'} type="submit">LOGIN</button>
                        <button className={'form-login-button'} type="button" onClick={() => navigate(-1)}>BACK</button>
                    </div>
                    <div className={'form-login-links-div'}>
                        <Link className={'form-login-links'} to={'/registration'}>Register</Link>
                        <Link className={'form-login-links'} to={'/auth/recovery'}>Recovery password</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {LoginFormComponent};