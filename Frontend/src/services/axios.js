import axios from "axios";

// Configure axios defaults
const baseURL = process.env.REACT_APP_API_URL || "";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
