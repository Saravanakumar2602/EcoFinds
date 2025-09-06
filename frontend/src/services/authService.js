import api from "./api";

const authService = {
  signup: async (email, password) => {
    const res = await api.post("/auth/register", { email, password });
    return res.data;
  },
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },
};

export default authService;
