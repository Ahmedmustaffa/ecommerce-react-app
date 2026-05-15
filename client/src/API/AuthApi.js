import axios from "axios";

// Match the backend auth route
const base_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => axios.post(`${base_URL}/signup`, userData);
export const loginUser = async (userData) => axios.post(`${base_URL}/login`, userData);
