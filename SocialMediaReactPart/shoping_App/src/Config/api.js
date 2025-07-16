import axios from "axios"
export const API_BASE_URL = "http://localhost:8090"

// Create API instance with interceptors to always use the current token
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to include the current JWT token on every request
api.interceptors.request.use(
    (config) => {
        // Get the current token from localStorage on each request
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
