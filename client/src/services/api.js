import axios from "axios";

const user_token = localStorage.getItem("jwt") || null;
// baseURL will change to heroku link
const api = axios.create({
  baseURL: process.env.BASE_URL,
  //   baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${user_token}`,
  },
});

//******* AUTH ********

// stores token in local storage
const storeToken = (token) => {
  localStorage.setItem("jwt", token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

//retrieves token from local storage
const getToken = () => {
  const token = localStorage.getItem("jwt");
  api.defaults.headers.common.authorization = `Bearer ${token}`;
  return token;
};

// ******* REGISTER/LOGIN FUNCTIONS *******

// sends register data to backend
export const createUser = async (userData) => {
  const response = await api.post(`api/auth/register`, userData);
  console.log(response);
  return response;
};

// sends login data to backend
export const loginUser = async (userData) => {
  const response = await api.post(`api/auth/login`, userData);
  console.log(response);
  const token = response.data.token;
  return response;
};

export const verifyToken = async () => {
  const token = localStorage.getItem("jwt");
  console.log(token);

  if (token) {
    try {
      const resp = await api.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

// sends data to backend to create a garden, verifie token
export const createGarden = async (gardenName) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const resp = await api.post("/api/gardens", gardenName, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

// function to get all gardens from user
export const fetchGarden = async () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const resp = await api.get("/api/gardens", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const addPlant = async (plant) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.post(
        "/api/plants",
        { ...plant },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const getPlant = async (id) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.get(`/api/plants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const editPlant = async (id, updates) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.put(`/api/plants/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const getAllPlants = async () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.get("/api/plants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const getAllPriorityPlants = async () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.get("/api/plants/priority", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const getAllPlantsInGarden = async (id) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.get(`/api/gardens/${id}/plants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};
export const getPlantCounts = async (type) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const query = type ? `?type=${type}` : "";
    try {
      const resp = await api.get(`/api/plants/count${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const searchPlantName = async (name) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.get(`/api/plants/query?plant_query=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const deletePlant = async (id) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.delete(`/api/plants/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const deleteGarden = async (id) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.delete(`/api/gardens/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const editGarden = async (id, editedName) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const resp = await api.put(
        `/api/gardens/${id}`,
        { garden_name: editedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (e) {
      return e.message;
    }
  }
};

export const fetchWeather = async () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    let zipcode = "11229";
    try {
      const resp = await api.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data[0].zipcode);
      zipcode = resp.data[0].zipcode;
    } catch (e) {
      return e.message;
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=03280779bfc099755378d100b1024c18`
    );
    return response;
  }
};
