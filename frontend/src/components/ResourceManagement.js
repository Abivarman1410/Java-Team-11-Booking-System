import React, { useState, useEffect } from 'react';
import { resourceAPI } from '../api/api';

function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: '', type: 'LAB', capacity: '', status: 'AVAILABLE'
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await resourceAPI.getAll();
      setResources(response.data);
    } catch (error) {
      setMessage('Error fetching resources');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await resourceAPI.update(editingId, formData);
        setMessage('Resource updated successfully');
      } else {
        await resourceAPI.create(formData);
        setMessage('Resource created successfully');
      }
      resetForm();
      fetchResources();
    } catch (error) {
      const errorMsg = error.response?.data || error.message || 'Error saving resource';
      setMessage(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    }
  };

  const handleEdit = (resource) => {
    setFormData({ name: resource.name, type: resource.type, capacity: resource.capacity, status: resource.status });
    setEditingId(resource.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this resource?')) {
      try {
        await resourceAPI.delete(id);
        setMessage('Resource deleted successfully');
        fetchResources();
      } catch (error) {
        setMessage('Error deleting resource');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'LAB', capacity: '', status: 'AVAILABLE' });
    setEditingId(null);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>🏢 Resource Management</h2>
      </div>

      {message && <div className={String(message).toLowerCase().includes('error') ? 'error-message' : 'success-message'}>{message}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Resource Name</label>
              <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="LAB">Lab</option>
                <option value="CLASSROOM">Classroom</option>
                <option value="EVENT_HALL">Event Hall</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="action-buttons">
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'} Resource</button>
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
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.name}</td>
                <td>{resource.type}</td>
                <td>{resource.capacity}</td>
                <td><span className={`badge badge-${resource.status.toLowerCase()}`}>{resource.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(resource)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(resource.id)}>Delete</button>
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

export default ResourceManagement;
