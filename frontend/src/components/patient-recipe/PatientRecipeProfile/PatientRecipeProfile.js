import React from 'react';
import './PatientRecipeProfile.css';
import {Link} from "react-router-dom";


/**
 * @param {{recipe : IRecipe}} props
 */

const PatientRecipeProfile = ({recipe}) => {
    return (
        <div>
            <Link className={'patient-recipe-profile-link'} to={`/patient-recipe/${recipe.id}`}>
                <h3>{recipe.recipe}</h3>
            </Link>
        </div>
    );
};

export {PatientRecipeProfile};