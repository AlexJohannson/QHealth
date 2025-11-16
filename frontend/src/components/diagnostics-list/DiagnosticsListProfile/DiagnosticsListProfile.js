import React from 'react';
import './DiagnosticsListProfile.css';
import {Link} from "react-router-dom";


/**
 * @param {{diagnostic : IDiagnostics}} props
 */

const DiagnosticsListProfile = ({diagnostic}) => {


    return (
        <div>
            <Link className={'diagnostics-list-profile-component'}
                  to={`/diagnostics-list/${diagnostic.id}`}>
                <h2>{diagnostic.modality}</h2>
            </Link>
        </div>
    );
};

export {DiagnosticsListProfile};