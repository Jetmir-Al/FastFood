import { api } from "./apiConfig.js";


export const login = async (email, password, role) => {
    const res = await api.post("/auth/login", {
        email, password, role
    });

    return res.data;
}

export const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
}


export const status = async () => {
    const res = await api.get("/auth/status", { withCredentials: true });
    return res.data;
}
