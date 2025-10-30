import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {apiService} from "../../services/apiService";
import {urls} from "../../constants/urls";

const ActivateAccountComponent = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const activate = async () => {
            try {
                await apiService.patch(urls.auth.activateAccount(token));
                navigate('/login');
            } catch (error) {
                console.log('Activation failed:', error);
                navigate('/login');
            }
        }
        activate();
    }, [token, navigate]);


    return (
        <div>
            <p>Activate account...</p>
        </div>
    );
};

export {ActivateAccountComponent};