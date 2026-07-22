import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
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