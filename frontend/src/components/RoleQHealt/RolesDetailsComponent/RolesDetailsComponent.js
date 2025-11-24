import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {roleService} from "../../../services/roleService";
import {RolesManagerComponent} from "../RolesManagerComponent/RolesManagerComponent";
import './RoleDetailsComponent.css';
import {FooterComponent} from "../../FooterComponent/FooterComponent";

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


    if (loading) return <p>Loading...</p>;
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
                <p>UserID: {id}</p>
                <p>Email: {email}</p>
                <p>Active: {is_active ? 'Yes' : 'No'}</p>
                <p>Role: {roles.role}</p>
                {roles.specialty && <p>Specialty: {roles.specialty}</p>}
                {roles.role === 'doctor' && (
                    <p>Available for booking: {roles.is_available_for_booking ? 'Yes' : 'No'}</p>
                )}
                <p>Phone Number: {profile.phone_number}</p>
                <p>Date of birth: {profile.date_of_birth}</p>
                <p>Height: {profile.height}</p>
                <p>Weight: {profile.weight}</p>
                <p>Street: {profile.street}</p>
                <p>House: {profile.house}</p>
                <p>City: {profile.city}</p>
                <p>Region: {profile.region}</p>
                <p>Country: {profile.country}</p>
                <p>Gender: {profile.gender}</p>
                <p>Create: {profile.created_at}</p>
                <p>Update: {profile.updated_at}</p>
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