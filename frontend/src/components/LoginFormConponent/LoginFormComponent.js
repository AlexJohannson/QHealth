import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {authService} from "../../services/authService";

const LoginFormComponent = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const onSubmit = async (user) => {
    try {
        await authService.login(user);
        const {data} = await authService.getMe();


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




    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={"text"} placeholder={"Email"} {...register('email',
                    { required: 'Email is required' })}/>
                <input type={"text"} placeholder={"Password"} {...register('password',
                    { required: 'Password is required' })}/>
                <button type="submit">LOGIN</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export {LoginFormComponent};