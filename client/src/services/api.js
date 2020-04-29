import axios from 'axios';

// baseURL will change to heroku link
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

// ******* REGISTER/LOGIN FUNCTIONS *******
// sends register data to backend 
export const createUser = async(userData) => {
    const response = await api.post(`api/auth/register`, userData);
    return response;
}

// sends login data to backend
export const loginUser = async(userData)=> {
    const response = await api.post(`api/auth/login`, userData);
    return response;
}

// stores token inlocal storage
export const storeToken = (token) => {
    localStorage.setItem('jwt', token);
    api.defaults.headers.common.authorization = `Bearer ${token}`
}