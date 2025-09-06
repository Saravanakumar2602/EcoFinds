import api from "./api";

const productService = {
  getAll: async () => {
    const res = await api.get("/products");
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  add: async (product) => {
    const res = await api.post("/products", product);
    return res.data;
  },
};

export default productService;
