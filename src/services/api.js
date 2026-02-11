import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeApi = {
  getAll: () => api.get('/employees'),
  getById: (employeeId) => api.get(`/employees/${employeeId}`),
  create: (employeeData) => api.post('/employees', employeeData),
  delete: (employeeId) => api.delete(`/employees/${employeeId}`),
};

// Attendance API calls
export const attendanceApi = {
  getAll: (params) => api.get('/attendance', { params }),
  getByEmployee: (employeeId) => api.get(`/attendance/employee/${employeeId}`),
  create: (attendanceData) => api.post('/attendance', attendanceData),
  getStats: (employeeId) => api.get(`/attendance/stats/${employeeId}`),
};

// Dashboard API calls
export const dashboardApi = {
  getStats: () => api.get('/dashboard'),
};

export default api;
