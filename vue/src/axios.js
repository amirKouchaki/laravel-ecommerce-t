import axios from "axios";
import store from "./src/store/index.js";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL / api,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem("TOKEN");
            router.push({ name: "login" });
        }
        throw error;
    }
);

export default axiosClient;
