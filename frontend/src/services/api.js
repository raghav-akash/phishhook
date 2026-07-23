import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const scanURL = async (url) => {
    const response = await api.post("/scan-url", { url });
    return response.data;
};

export const getHistory = async (
    limit = 20,
    offset = 0,
    risk = "",
    prediction = ""
) => {
    const params = { limit, offset };

    if (risk) params.risk = risk;
    if (prediction) params.prediction = prediction;

    const response = await api.get("/history", { params });

    return response.data;
};