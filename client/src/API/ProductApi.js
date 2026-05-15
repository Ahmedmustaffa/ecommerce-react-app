import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const base_URL = `${API_URL}/api/products`;

export const getAllProduct = async () => axios.get(base_URL);
export const getProductById = async (id) => axios.get(`${base_URL}/${id}`);

export const createProduct = async (product) => axios.post(`${base_URL}/add`, product);

export const deleteProduct = async (id) => axios.delete(`${base_URL}/${id}`);

export const updateProduct = async (id, product) => axios.put(`${base_URL}/${id}`, product);
