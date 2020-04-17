import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export const fetchResponse = async() => {
    const response = await axios.get('http://localhost:3001/');
    return response;
}

export const createUser = async(userData) => {
    const response = await api.post(`/users`, userData);
    return response;
}