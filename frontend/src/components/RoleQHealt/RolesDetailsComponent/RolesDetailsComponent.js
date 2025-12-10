import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {roleService} from "../../../services/roleService";
import {RolesManagerComponent} from "../RolesManagerComponent/RolesManagerComponent";
import './RoleDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";
import {formatDate} from "../../../untils/formatDate";

const RolesDetailsComponent = () => {
    const {id} = useParams();
    const roleId = id || localStorage.getItem('roleId');
    const [roles, setRoles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await roleService.getRolesById(roleId);
                setRoles(res.data);
            } catch (error) {
                setError('Role not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [roleId]);


    if (loading) return <div className={'loading-roles'}><h1 className={'loading-roles-text'}>Loading...</h1></div>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;
    if (!roles || !roles.user || !roles.user.profile) return <p>No role data</p>;


    const currentUserId = localStorage.getItem('userId');
    const isSuperuser = localStorage.getItem('is_superuser') === 'true';
    const isStaff = localStorage.getItem('is_staff') === 'true';


    const canManageDoctor =
        roles.role === 'doctor' &&
        roles.user.id.toString() !== currentUserId &&
        (isSuperuser || isStaff);


    const {profile, email, is_active} = roles.user;


    return (
        <div className={'role-details-component'}>
            <div className={'role-details-container-header'}>
                <img src={'/img/logo.png'} className={'logo-role-details'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'role-details-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className={'role-details-container-profile'}>
                <h3>{profile.name} {profile.surname}</h3>
                <p><strong>Number:</strong> {id}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Active:</strong> {is_active ? 'Yes' : 'No'}</p>
                <p><strong>Role:</strong> {roles.role}</p>
                {roles.specialty && <p><strong>Specialty:</strong> {roles.specialty}</p>}
                {roles.role === 'doctor' && (
                    <p><strong>Available for booking:</strong> {roles.is_available_for_booking ? 'Yes' : 'No'}</p>
                )}
                <p><strong>Phone Number:</strong> {profile.phone_number}</p>
                <p><strong>Date of birth:</strong> {profile.date_of_birth}</p>
                <p><strong>Height:</strong> {profile.height}</p>
                <p><strong>Weight:</strong> {profile.weight}</p>
                <p><strong>Street:</strong> {profile.street}</p>
                <p><strong>House:</strong> {profile.house}</p>
                <p><strong>City:</strong> {profile.city}</p>
                <p><strong>Region:</strong> {profile.region}</p>
                <p><strong>Country:</strong> {profile.country}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Create:</strong> {formatDate(profile.created_at)}</p>
                <p><strong>Update:</strong> {formatDate(profile.updated_at)}</p>
            </div>
            <div>
                {canManageDoctor && (
                <RolesManagerComponent role={roles} onUpdate={async () => {
                    setLoading(true);
                    try {
                        const res = await roleService.getRolesById(roleId);
                        setRoles(res.data);
                    } catch {
                        setError('Role not found.');
                    } finally {
                        setLoading(false);
                    }
                }}/>
                )}
            </div>
            <FooterComponent/>
        </div>
    );
};

export {RolesDetailsComponent};