import React, {useEffect, useState} from 'react';
import './PatientRecipeDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {patientRecipeService} from "../../../services/patientRecipeService";
import {FooterComponent} from "../../FooterComponent/FooterComponent";


const PatientRecipeDetails = () => {
    const {id} = useParams();
    const [patientRecipes, setPatientRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPatientRecipes = async () => {
            try {
                const res = await patientRecipeService.getPatientRecipeById(id);
                setPatientRecipes(res.data);
            } catch (err) {
                setError('Patient Recipe Not Found');
            } finally {
                setLoading(false);
            }
        };
        fetchPatientRecipes();
    }, [id]);

    const isSuperUser =localStorage.getItem('is_superuser') === 'true';
    const isAdmin = localStorage.getItem('is_staff') === 'true';

     const canDelete = isSuperUser || isAdmin;


    const handleDelete = async () => {
        try {
            await patientRecipeService.deletePatientRecipeById(id);
            navigate(-1);
        } catch (err) {
            setError('Delete failed');
        }
    }


    if (loading) return <p>Loading diagnostic...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'patient-recipe-details-container'}>
            <div className={'patient-recipe-details-header'}>
                <img src={'/img/logo.png'} className={'logo-patient-recipe-detail-header'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'patient-pecipe-detail-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'patient-recipe-details-profile'}>
                <h2>My Recipe:</h2>
                <p>Number: {patientRecipes.id}</p>
                <p>Recipe: {patientRecipes.recipe}</p>
                <p>Description: {patientRecipes.description}</p>
                <h3>Patient:</h3>
                <p>Name: {patientRecipes.user.profile.name}</p>
                <p>Surname: {patientRecipes.user.profile.surname}</p>
            </div>
            {canDelete && (
                <button className={'patient-recipe-details-delete-button'}
                        onClick={handleDelete}>Delete Recipe</button>
            )}
            <FooterComponent/>
        </div>
    );
};

export {PatientRecipeDetails};