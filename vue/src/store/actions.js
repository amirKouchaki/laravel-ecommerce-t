import axiosClient from "../axios";

export async function getUser({ commit }, data) {
    try {
        const response = await axiosClient.get("/user", data);
        const rData = response.data;
        commit("setUser", rData.user);
        return rData;
    } catch (error) {
        return error;
    }
}

export async function login({ commit }, data) {
    const response = await axiosClient.post("/login", data);
    const rData = response.data;
    commit("setUser", rData.user);
    commit("setToken", rData.token);
    return rData;
}

export async function logout({ commit }) {
    const response = await axiosClient.post("/logout");
    commit("setToken", null);
    return response;
}
