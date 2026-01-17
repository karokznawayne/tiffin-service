'use client';
import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, role, isApproved) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role, isApproved })
      });
      if (res.ok) {
        fetchUsers(); // Refresh
      } else {
        alert('Failed to update user. Only Master Admin can do this.');
      }
    } catch (error) {
      alert('Error updating user');
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                </td>
                <td>
                  {user.isApproved ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-500 font-bold">Pending</span>
                  )}
                </td>
                <td className="actions text-right p-4">
                  {user.role !== 'MASTER_ADMIN' && user.role !== 'USER' && !user.isApproved && (
                    <button 
                      onClick={() => updateUser(user.id, user.role, true)}
                      className="btn-approve"
                    >
                      Approve
                    </button>
                  )}
                  {user.role !== 'MASTER_ADMIN' && (
                    <select 
                      value={user.role}
                      onChange={(e) => updateUser(user.id, e.target.value, user.isApproved)}
                      className="role-select"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="TEAM_LEAD">Team Lead</option>
                      <option value="DELIVERY">Delivery</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          overflow-x: auto;
        }
        .users-table {
          width: 100%;
          border-collapse: collapse;
        }
        .users-table th {
          text-align: left;
          padding: 16px;
          border-bottom: 2px solid #f0f0f0;
          color: #666;
        }
        .users-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .role-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }
        .role-badge.master_admin { background: #e94560; color: white; }
        .role-badge.admin { background: #4a90e2; color: white; }
        .role-badge.user { background: #eee; color: #333; }
        
        .btn-approve {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }
        .role-select {
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}
