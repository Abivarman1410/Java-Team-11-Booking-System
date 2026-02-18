import React, { useState, useEffect } from 'react';
import { userAPI } from '../api/api';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'STUDENT', status: 'ACTIVE'
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      setMessage('Error fetching users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userAPI.update(editingId, formData);
        setMessage('User updated successfully');
      } else {
        await userAPI.create(formData);
        setMessage('User created successfully');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      const errorMsg = error.response?.data || error.message || 'Error saving user';
      setMessage(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await userAPI.delete(id);
        setMessage('User deleted successfully');
        fetchUsers();
      } catch (error) {
        setMessage('Error deleting user');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', role: 'STUDENT', status: 'ACTIVE' });
    setEditingId(null);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>👥 User Management</h2>
      </div>

      {message && <div className={String(message).toLowerCase().includes('error') ? 'error-message' : 'success-message'}>{message}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required disabled={editingId} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option value="STUDENT">Student</option>
                <option value="STAFF">Staff</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
          <div className="action-buttons">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'} User</button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td><span className={`badge badge-${user.status.toLowerCase()}`}>{user.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
