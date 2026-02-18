import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (user) => api.post('/users', user),
  update: (id, user) => api.put(`/users/${id}`, user),
  delete: (id) => api.delete(`/users/${id}`),
  filterByStatus: (status) => api.get(`/users/filter?status=${status}`),
};

// Resource APIs
export const resourceAPI = {
  getAll: () => api.get('/resources'),
  getById: (id) => api.get(`/resources/${id}`),
  create: (resource) => api.post('/resources', resource),
  update: (id, resource) => api.put(`/resources/${id}`, resource),
  delete: (id) => api.delete(`/resources/${id}`),
};

// Booking APIs
export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (booking) => api.post('/bookings', booking),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status?status=${status}`),
  delete: (id) => api.delete(`/bookings/${id}`),
  getByUser: (userId) => api.get(`/bookings/user/${userId}`),
  getByResource: (resourceId) => api.get(`/bookings/resource/${resourceId}`),
};

export default api;
