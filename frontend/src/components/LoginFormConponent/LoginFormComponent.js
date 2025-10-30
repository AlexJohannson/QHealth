import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import { authService } from '../../services/authService';
import './LoginFormComponent.css';
import {FooterComponent} from "../FooterComponent/FooterComponent";

const LoginFormComponent = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async user => {
    try {
      await authService.login(user);
      const { data } = await authService.getMe();

      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);
      localStorage.setItem('is_superuser', data.is_superuser);
      localStorage.setItem('is_staff', data.is_staff);
      localStorage.setItem('is_user', data.is_user);

      if (data.is_superuser) {
        navigate('/superuser');
      } else if (data.is_staff) {
        navigate('/admin');
      } else if (data.is_user) {
        navigate('/user-home-page');
      } else {
        navigate('/login');
      }
    } catch (e) {
      console.log('Login error:', e);
      setError(e.response?.data?.detail || e.message || 'Something went wrong');
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <div className={'login-container'}>
      <div className={'login-container-header'}>
          <img src={'/img/logo.png'} className={'logo-login'} alt="Logo"/>
          <h1>QHealth</h1>
      </div>
      <div className={'login-form-div'}>
          <form className={'form-login'} onSubmit={handleSubmit(onSubmit)}>
              <h2>LOGIN</h2>
              {error && <p className={'form-login-error'}>{error}</p>}
        <input
          type="text"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
        />
        <div className={'login-password'}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          <button className={'show-password-login'} type="button" onClick={togglePassword}
          >{showPassword ? '👁️' : '🙈'}</button>
        </div>
            <div className={'form-login-button-div'}>
              <button  className={'form-login-button'} type="submit">LOGIN</button>
              <button className={'form-login-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'form-login-links-div'}>
                <Link className={'form-login-links'} to={'/registration'}>Register</Link>
                <Link className={'form-login-links'} to={'/auth/recovery'}>Recovery password</Link>
            </div>
      </form>
      </div>

      <div>

      </div>
        <FooterComponent/>
    </div>

  );
};

export { LoginFormComponent };