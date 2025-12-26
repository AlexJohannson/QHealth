import React from 'react';
import './PatientRecipeProfile.css';
import {Link} from "react-router-dom";


/**
 * @param {{recipe : IRecipe}} props
 */

const PatientRecipeProfile = ({recipe}) => {
    const patientProfile = recipe?.user.profile;

    return (
        <Link className={'patient-recipe-profile-link'} to={`/patient-recipe/${recipe.id}`}>
            <div className={'patient-recipe-profile-link-container'}>
                <div className={'patient-recipe-profile-link-container-items'}>
                    <h4>Patient Name:</h4>
                    <h2>{patientProfile.name}</h2>
                </div>
                <div className={'patient-recipe-profile-link-container-items'}>
                    <h4>Patient Surname:</h4>
                    <h2>{patientProfile.surname}</h2>
                </div>
                <div className={'patient-recipe-profile-link-container-items'}>
                    <h4>Recipe:</h4>
                    <h2>{recipe.recipe}</h2>
                </div>
            </div>
        </Link>
    );
};

export {PatientRecipeProfile};