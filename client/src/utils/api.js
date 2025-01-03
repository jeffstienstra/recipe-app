import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
    // baseURL: "https://recipe-app-gjbw.onrender.com", // for production server
    baseURL: "http://localhost:5173", // for localhost
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
