"use server";
import axios from "axios";
import { cookies } from "next/headers";
const API_BASE_URL = "http://localhost:3000/api";
const WS_BASE_URL = "http://localhost:3000/ws";

const resolveBaseURL = () => {
    return process.env.NODE_ENV === "production" ? API_BASE_URL : API_BASE_URL;
};

export const apiInstance = axios.create({
    baseURL: resolveBaseURL(),
    withCredentials: true,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    xsrfCookieName: "csrf_token",
    xsrfHeaderName: "x-csrf-token",
});

const refreshToken = async () => {
    try {
        const response = await apiInstance.post("/auth/refresh-token");
        const newToken = response.data.token;

        (await cookies()).set("access_token", newToken, {
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
    } catch (error) {
        throw error;
    }
};

apiInstance.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        await refreshToken();
        return apiInstance(error.config); // Gửi lại request ban đầu
    }

    throw error;
});

export async function get<T>(url: string, cfg?: any) {
    const { data } = await apiInstance.get<T>(url, cfg);
    return data;
}
export async function post<T>(url: string, body?: any, cfg?: any) {
    const { data } = await apiInstance.post<T>(url, body, cfg);
    return data;
}
export async function put<T>(url: string, body?: any, cfg?: any) {
    const { data } = await apiInstance.put<T>(url, body, cfg);
    return data;
}
export async function del<T>(url: string, cfg?: any) {
    const { data } = await apiInstance.delete<T>(url, cfg);
    return data;
}
export async function patch<T>(url: string, body?: any, cfg?: any) {
    const { data } = await apiInstance.patch<T>(url, body, cfg);
    return data;
}
