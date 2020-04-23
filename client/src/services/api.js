import axios from 'axios';

// baseURL will change to heroku link
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

// sends register data to backend 
export const createUser = async(userData) => {
    const response = await api.post(`auth/users`, userData);
    return response;
}