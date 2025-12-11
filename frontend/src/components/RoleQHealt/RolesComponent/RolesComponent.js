import React, {useEffect, useState} from 'react';
import {roleService} from "../../../services/roleService";
import {RolesProfileComponent} from "../RolesProfileComponent/RolesProfileComponent";
import {PaginationComponent} from "../../PaginationComponent/PaginationComponent";
import {RolesFilterComponent} from "../RolesFilterComponent/RolesFilterComponent";
import './RolesComponent.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../../FooterComponent/FooterComponent";


const RolesComponent = () => {
    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const data = await roleService.getAll({page, size});
                setRoles(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                setError('Could not load roles.');
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [page, size]);


    if (loading) return (
        <div className="role-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="role-skeleton-item">
                    <div className="role-skeleton-avatar"></div>
                    <div className="role-skeleton-info">
                        <div className="role-skeleton-line short"></div>
                        <div className="role-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );
    if (error) return <p style={{color: 'red'}}>{error}</p>;




    return (
        <div className="roles-component-container">
            <div className={'role-component-container-header'}>
                <img src={'/img/logo.png'} className={'logo-role-component-container'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'role-component-container-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className="roles-component-filter">
                <RolesFilterComponent onFilter={(params) => {
                        roleService.getAll(params).then(res => setRoles(res.data));
                    }}
                />
            </div>
            <div className={'roles-component-maping'}>
                {roles.length === 0 ? (
                    <p className={'role-component-container-information'}>No roles found</p>
                ) : (
                    roles.map(role => (
                        <RolesProfileComponent key={role.id} role={role}/>
                    ))
                )}
            </div>
            <div className={'roles-component-pagination'}>
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                        onSizeChange={(newSize) => {setSize(newSize); setPage(1)}}
                />
            </div>
            <FooterComponent/>
        </div>
    );
};

export {RolesComponent};