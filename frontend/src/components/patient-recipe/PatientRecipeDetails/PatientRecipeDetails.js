import React, {useEffect, useState} from 'react';
import './PatientRecipeDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {patientRecipeService} from "../../../services/patientRecipeService";
import {formatDate} from "../../../untils/formatDate";


const PatientRecipeDetails = () => {
    const {id} = useParams();
    const [patientRecipes, setPatientRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState(false);


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


    if (loading) return (
        <div className="patient-recipe-details-skeleton">
            <div className="patient-recipe-details-skeleton-avatar"></div>
            <div className="patient-recipe-details-skeleton-line short"></div>
            <div className="patient-recipe-details-skeleton-line long"></div>
            <div className="patient-recipe-details-skeleton-line long"></div>
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className={'patient-recipe-details-container'}>
            <div className={'patient-recipe-details-profile'}>
                <h2>My Recipe:</h2>
                <p><strong>Number:</strong> {patientRecipes.id}</p>
                <p><strong>Recipe:</strong> {patientRecipes.recipe}</p>
                <p><strong>Description:</strong> {patientRecipes.description}</p>
                <p><strong>Greate:</strong> {formatDate(patientRecipes.created_at)}</p>
                <h3>Patient:</h3>
                <p><strong>Name:</strong> {patientRecipes.user.profile.name}</p>
                <p><strong>Surname:</strong> {patientRecipes.user.profile.surname}</p>
            </div>
            {canDelete && (
                !confirmDelete ? (
                          <button className={'patient-recipe-details-delete-button'}
                         onClick={() => setConfirmDelete(true)}>
                              Delete Recipe
                          </button>
                    ) : (
                        <div className={'patient-recipe-details-delete-button-confirmation'}>
                            <p className={'patient-recipe-details-delete-button-confirmation-error'}>
                                Are you sure you want to delete patient recipe?
                            </p>

                            {error && (
                                <p className="patient-recipe-details-delete-button-confirmation-error">
                                    {error}
                                </p>
                            )}

                            <button
                                className={'patient-recipe-details-delete-button-confirmation-button-delete'}
                                type="button"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>

                            <button
                                className={'patient-recipe-details-delete-button-confirmation-button-cancel'}
                                type="button"
                                onClick={() => {
                                    setConfirmDelete(false);
                                    setError('');
                                }}
                            >
                                No, cancel
                            </button>
                        </div>
                    )
            )}
        </div>
    );
};

export {PatientRecipeDetails};
