import axios from "axios";

const base_URL = "http://localhost:3005/product";


export const getAllProduct = async () => axios.get(base_URL);
export const getProductById = async(id) => axios.get(`${base_URL}/${id}`);

export const createProduct = async(product) => axios.post(base_URL,product);

export const deleteProduct = async(id) => axios.delete(`${base_URL}/${id}`);

export const updateProduct = async (id, product) => axios.put(`${base_URL}/${id}`, product);