// src/services/productService.js
import api from "./api";
import products from "../data/products"; // fallback mock data

const USE_MOCK = true; // set false when backend is ready

const productService = {
  getAll: async () => {
    if (USE_MOCK) return products; // mock
    const res = await api.get("/products");
    return res.data;
  },
  getById: async (id) => {
    if (USE_MOCK) return products.find((p) => p.id === parseInt(id));
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
};
export default productService;
