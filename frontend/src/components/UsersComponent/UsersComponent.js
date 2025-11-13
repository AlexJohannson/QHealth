import React, {useEffect, useState} from 'react';
import {userService} from '../../services/userService';
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";
import {UserProfileComponent} from "./UserProfileComponent/UserProfileComponent";
import {UsersFilterComponent} from "./UserFilterComponent/UserFilterComponent";
import './UsersComponet.css';
import {useNavigate} from "react-router-dom";
import {FooterComponent} from "../FooterComponent/FooterComponent";


const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await userService.getAll({page, size});
                setUsers(data.data);
                setTotalPages(data.total_pages);
            } catch (e) {
                setError('Could not load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, size]);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="users-component-container">
            <div className={'user-component-container-header'}>
                <img src={'/img/logo.png'} className={'logo-user-component-container'} alt="Logo"/>
                <h1>QHealth</h1>
                <button className={'user-component-container-button'} onClick={() => navigate(-1)}>BACK</button>
            </div>
            <div className="users-component-container-filter">
                <UsersFilterComponent onFilter={(params) => {
                    userService.getAll(params).then(res => setUsers(res.data));
                }}
                />
            </div>
            <div className='users-component-container-maping'>
                {users.length === 0 ? (
                    <p className={'users-component-container-information'}>No users found.</p>
                ) : (
                    users.map(user => (
                        <UserProfileComponent key={user.id} user={user}/>
                    ))
                )}
            </div>
            <div className="users-component-container-pagination">
                <PaginationComponent page={page} totalPages={totalPages} size={size} onPageChange={setPage}
                                     onSizeChange={(newSize) => {
                                         setSize(newSize);
                                         setPage(1);
                                     }}
                />
            </div>
            <FooterComponent/>
        </div>

    );
};

export {UsersComponent};