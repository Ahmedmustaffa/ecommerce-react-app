import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const base_URL = `${API_URL}/api/auth`;

export const registerUser = async (userData) => axios.post(`${base_URL}/signup`, userData);
export const loginUser = async (userData) => axios.post(`${base_URL}/login`, userData);
