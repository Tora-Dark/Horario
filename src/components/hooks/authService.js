

import axios from 'axios';
/* const API_URL = 'http://localhost:8000/api'; // Ajusta la URL según tu configuración */
const apiURL = import.meta.env.VITE_LOCAL_API_URL;

export const register = (name, email, password) => {
    return axios.post(`${apiURL}/register`, {
        name,
        email,
        password,
        password_confirmation: password
    });
};

export const login = async (email, password) => {
    const response = await axios.post(`${apiURL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};


export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};
