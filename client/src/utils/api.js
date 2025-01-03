import axios from "axios";

// Determine the base URL based on the environment
const baseURL = process.env.VITE_BASE_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the JWT token in the headers
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('jwtToken'); // Adjust to your token storage method
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Add a default export for the Axios instance
export default api;
