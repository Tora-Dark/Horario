// src/authService.js

import axios from 'axios';

/* const API_URL = 'http://localhost:8000/api'; // Ajusta la URL según tu configuración */
const apiURL = import.meta.env.VITE_API_URL;



export const register = (name, email, password) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: password
    });
};

export const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
