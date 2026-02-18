import React, { useState, useEffect } from 'react';
import { bookingAPI, userAPI, resourceAPI } from '../api/api';

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    userId: '', resourceId: '', bookingDate: '', timeSlot: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchResources();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      setMessage('Error fetching bookings');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  };

  const fetchResources = async () => {
    try {
      const response = await resourceAPI.getAll();
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookingAPI.create(formData);
      setMessage('Booking created successfully');
      resetForm();
      fetchBookings();
    } catch (error) {
      const errorMsg = error.response?.data || error.message || 'Error creating booking';
      setMessage(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, status);
      setMessage('Booking status updated');
      fetchBookings();
    } catch (error) {
      setMessage('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this booking?')) {
      try {
        await bookingAPI.delete(id);
        setMessage('Booking deleted successfully');
        fetchBookings();
      } catch (error) {
        setMessage('Error deleting booking');
      }
    }
  };

  const resetForm = () => {
    setFormData({ userId: '', resourceId: '', bookingDate: '', timeSlot: '' });
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const getResourceName = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource ? resource.name : 'Unknown';
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>📅 Booking Management</h2>
      </div>

      {message && <div className={String(message).toLowerCase().includes('error') ? 'error-message' : 'success-message'}>{message}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>User</label>
              <select value={formData.userId} onChange={(e) => setFormData({...formData, userId: e.target.value})} required>
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Resource</label>
              <select value={formData.resourceId} onChange={(e) => setFormData({...formData, resourceId: e.target.value})} required>
                <option value="">Select Resource</option>
                {resources.filter(r => r.status === 'AVAILABLE').map(resource => (
                  <option key={resource.id} value={resource.id}>{resource.name} ({resource.type})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Booking Date</label>
              <input type="date" value={formData.bookingDate} onChange={(e) => setFormData({...formData, bookingDate: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Time Slot</label>
              <select value={formData.timeSlot} onChange={(e) => setFormData({...formData, timeSlot: e.target.value})} required>
                <option value="">Select Time</option>
                <option value="09:00-10:00">09:00 - 10:00</option>
                <option value="10:00-11:00">10:00 - 11:00</option>
                <option value="11:00-12:00">11:00 - 12:00</option>
                <option value="14:00-15:00">14:00 - 15:00</option>
                <option value="15:00-16:00">15:00 - 16:00</option>
                <option value="16:00-17:00">16:00 - 17:00</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Create Booking</button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Resource</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{getUserName(booking.userId)}</td>
                <td>{getResourceName(booking.resourceId)}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.timeSlot}</td>
                <td><span className={`badge badge-${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                <td>
                  <div className="action-buttons">
                    {booking.status === 'PENDING' && (
                      <>
                        <button className="btn btn-sm btn-success" onClick={() => handleStatusUpdate(booking.id, 'APPROVED')}>Approve</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleStatusUpdate(booking.id, 'REJECTED')}>Reject</button>
                      </>
                    )}
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(booking.id)}>Delete</button>
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

export default BookingManagement;
