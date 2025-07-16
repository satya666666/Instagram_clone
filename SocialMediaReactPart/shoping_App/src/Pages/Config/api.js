import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  baseURL: 'http://localhost:8090', // Updated port to match Spring Boot application
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt');
      // Redirect to login page if needed
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);
