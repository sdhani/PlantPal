import axios from 'axios';

const user_token = localStorage.getItem('jwt') || null ;
// baseURL will change to heroku link
const api = axios.create({
    baseURL: 'https://plant-pals.herokuapp.com',
    // baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${user_token}`,
    }
});

//******* AUTH ********

// stores token in local storage
const storeToken = (token) => {
  localStorage.setItem('jwt', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

//retrieves token from local storage
const getToken = () => {
  const token = localStorage.getItem('jwt');
  api.defaults.headers.common.authorization = `Bearer ${token}`;
  return token;
}

// ******* REGISTER/LOGIN FUNCTIONS *******

// sends register data to backend 
export const createUser = async(userData) => {
    const response = await api.post(`api/auth/register`, userData);
    console.log(response);
    return response;
}

// sends login data to backend
export const loginUser = async(userData)=> {
    const response = await api.post(`api/auth/login`, userData);
    console.log(response);
    const token = response.data.token;
    return response;
}


export const verifyToken = async () => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    
    if (token){
        try{
            const resp = await api.get('/api/auth/me', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(resp.data);
            return resp.data;
          } catch (e) {
            return e.message;
          }
    }
}

// sends data to backend to create a garden, verifie token
export const createGarden = async(gardenName) => {
  const token = localStorage.getItem('jwt')

  if (token){
    try{
        const resp = await api.post('/api/gardens', gardenName, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
        return resp.data;
      } catch (e) {
        return e.message;
      }
  }
}

// function to get all gardens from user
export const fetchGarden = async() => {
  const token = localStorage.getItem('jwt');
  
  if (token){
    try{
        const resp = await api.get('/api/gardens', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return resp.data;
      } catch (e) {
        return e.message;
      }
  }
}