import React, { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { UserProfileComponent } from './UserProfileComponent';
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";


const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getAll({ page });
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error('Failed to fetch users:', e);
        setError('Could not load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <UserProfileComponent key={user.id} user={user} />
        ))
      )}

      <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export { UsersComponent };