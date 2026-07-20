import axios from "axios";

const api = axios.create({
baseURL: "http://localhost:5000/api",
});


api.interceptors.request.use((req) => {
const token = localStorage.getItem("token");

if (token) {
req.headers.Authorization = `Bearer ${token}`;
}

return req;
});

// AUTH APIs
export const registerUser = (data) => {
return api.post("/auth/register", data);
};

export const loginUser = (data) => {
return api.post("/auth/login", data);
};

export default api;
