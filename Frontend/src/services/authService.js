import api from './api';

const authService = {
    login: async (email, password) => {
        const response = await api.post('/accounts/login/', { email, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/accounts/register/', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('access_token');
        return !!token;
    },

    getProfile: async () => {
        const response = await api.get('/accounts/profile/');
        return response.data;
    }
};

export default authService;
