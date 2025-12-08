import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

// Helper to get auth headers
const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };
};

const budgetService = {
    // Get all budgets
    getAll: async () => {
        const response = await axios.get(`${API_URL}/budgets/`, getAuthHeaders());
        return response.data;
    },

    // Get a specific budget
    get: async (id) => {
        const response = await axios.get(`${API_URL}/budgets/${id}/`, getAuthHeaders());
        return response.data;
    },

    // Create a new budget
    create: async (budgetData) => {
        const response = await axios.post(`${API_URL}/budgets/`, budgetData, getAuthHeaders());
        return response.data;
    },

    // Update a budget
    update: async (id, budgetData) => {
        const response = await axios.put(`${API_URL}/budgets/${id}/`, budgetData, getAuthHeaders());
        return response.data;
    },

    // Delete a budget
    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/budgets/${id}/`, getAuthHeaders());
        return response.data;
    },
};

export default budgetService;
