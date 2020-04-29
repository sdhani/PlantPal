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

export const verifyToken = async () => {
    const token = localStorage.getItem('jwt');
    if (token){
        try{
                const resp = await api.get('/api/auth/me', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            storeToken(token);
            return resp.data;
          } catch (e) {
            return e.message;
          }
    }
    // const resp = await api.get('/api/auth/me');
    // return resp;
    // if(token){
    //     try {
    //         const resp = await api.get('/api/auth/me', {
    //           headers: {
    //             Authorization: `Bearer ${token}`
    //           }
    //         });
    //         storeToken(token);
    //         return resp.data.user;
    //       } catch (e) {
    //         return e.message;
    //       }
    // }
}