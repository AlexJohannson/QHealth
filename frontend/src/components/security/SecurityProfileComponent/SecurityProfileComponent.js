import React from 'react';
import './SecurityProfileComponent.css';
import {formatDate} from "../../../untils/formatDate";


/**
 * @param {{security: ISecurity}} props
 */
const SecurityProfileComponent = ({security, onSelect}) => {
  return (
    <div className={'security-profile-component'} onClick={onSelect}>
        <h4>ID: {security.id}</h4>
        <h4>Email: {security.email}</h4>
        <h4>IP Address: {security.ip_address}</h4>
        <h4>Time stamp: {formatDate(security.timestamp)}</h4>
        <h4>Success: {security.success ? 'Yes' : 'No'}</h4>
        <h4>Created: {formatDate(security.created_at)}</h4>
        <h4>Updated: {formatDate(security.updated_at)}</h4>
    </div>
  );
};

export {SecurityProfileComponent};