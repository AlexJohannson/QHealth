import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {userService} from "../../services/userService";
import './VerifyEmailComponent.css';


const VerifyEmailComponent = () => {
    const [message, setMessage] = useState('');
    const {token} = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await userService.verifyEmail(token);
                setMessage(res.data.detail)
            } catch (err) {
                setMessage(err.response?.data?.detail || 'Verification failed');
            }
        };
        verifyEmail();
    }, [token]);


    return (
        <div className={'verify-email-container'}>
            {message && <h1>{message}</h1>}
        </div>
    );
};

export {VerifyEmailComponent};