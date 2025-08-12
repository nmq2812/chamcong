'use server';
import axios from "axios";
import { cookies } from "next/headers";
const API_BASE_URL = "http://localhost:8088/api/v1";
const WS_BASE_URL = "http://localhost:8088/ws";

export const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshToken = async () => {
    try {
        const response = await apiInstance.post("/auth/refresh-token");
        const newToken = response.data.token;

        (await cookies()).set("access_token", newToken, {
            
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    } catch (error) {
        throw error;
    }
}

apiInstance.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        await refreshToken();
        return apiInstance(error.config); // Gửi lại request ban đầu
    }

    throw error;
});
