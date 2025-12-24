import React, {useEffect, useState} from 'react';
import {userService} from '../../services/userService';
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";
import {UserProfileComponent} from "./UserProfileComponent/UserProfileComponent";
import {UsersFilterComponent} from "./UserFilterComponent/UserFilterComponent";
import './UsersComponet.css';



const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


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


    if (loading) return (
        <div className="users-skeleton-container">
            {[...Array(size)].map((_, idx) => (
                <div key={idx} className="user-skeleton-item">
                    <div className="user-skeleton-avatar"></div>
                    <div className="user-skeleton-info">
                        <div className="user-skeleton-line short"></div>
                        <div className="user-skeleton-line long"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div className="users-component-container">
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
        </div>

    );
};

export {UsersComponent};