import axios from "axios";


const BASE_URL = "https://roomfinder-hrx5.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptors to add the access token to the headers
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // response interceptors to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;
      try {
        const response = await axios.get(BASE_URL + "/refresh-token", {

          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        orginalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(orginalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., log out the user)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
