import { api } from "./apiConfig.js";

export const getFoods = async () => {
    const res = await api.get("/food/foodList");
    return res.data;
}