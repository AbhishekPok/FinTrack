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

const categoryService = {
    // Get all categories
    getAll: async () => {
        const response = await axios.get(`${API_URL}/transactions/categories/`, getAuthHeaders());
        return response.data;
    },

    // Get a specific category
    get: async (id) => {
        const response = await axios.get(`${API_URL}/transactions/categories/${id}/`, getAuthHeaders());
        return response.data;
    },

    // Create a new category
    create: async (categoryData) => {
        const response = await axios.post(`${API_URL}/transactions/categories/`, categoryData, getAuthHeaders());
        return response.data;
    },

    // Update a category
    update: async (id, categoryData) => {
        const response = await axios.put(`${API_URL}/transactions/categories/${id}/`, categoryData, getAuthHeaders());
        return response.data;
    },

    // Delete a category
    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/transactions/categories/${id}/`, getAuthHeaders());
        return response.data;
    },
};

export default categoryService;
