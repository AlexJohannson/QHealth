import React, {useState} from 'react';
import './CreateNewPatientRecipe.css';
import {useLocation, useNavigate} from "react-router-dom";
import {patientRecipeService} from "../../../services/patientRecipeService";
import {FooterComponent} from "../../FooterComponent/FooterComponent";

const CreateNewPatientRecipe = ({patientId}) => {
    const [recipe, setRecipe] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientIdFromUrl = searchParams.get('patientId');

    const userId = patientId
        ? Number(patientId)
        : patientIdFromUrl
            ? Number(patientIdFromUrl)
            : Number(localStorage.getItem('userId'));

    const handleBookingRecipe = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);

        const data = {
            user_id: userId,
            recipe,
            description,
        };

        try {
            await patientRecipeService.createNewPatientRecipe(data);
            setSuccess(true);
            setRecipe('');
            setDescription('');
        } catch (error) {
            setError('Patient recipe should be filled');
        } finally {
            setLoading(false);
        }
    }
    
    
    
    return (
        <div className={'create-new-patient-recipe'}>
            <div className={'create-recipe-form-header'}>
                <img src={'/img/logo.png'} className={'logo-create-recipe-form'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'create-recipe-form-header-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'create-recipe-form'}>
                <h3>Create New Patient Recipe</h3>

                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>Journal created successfully</p>}

                <div className={'create-recipe-form-recipe'}>
                    <label>Recipe:</label>
                    <input
                        type="text"
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                    />
                </div>
                <div className={'create-recipe-form-description'}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className={'create-recipe-form-button-recipe'} onClick={handleBookingRecipe} disabled={loading}>
                    {loading ? 'Saving...' : 'Create Recipe'}
                </button>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {CreateNewPatientRecipe};