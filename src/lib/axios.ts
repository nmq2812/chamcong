"use server";
import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ApiErrorShape } from "./errors";
const API_BASE_URL = "http://localhost:3000/api";
const API_BASE_URL_PROD = "https://chamcong-azure.vercel.app/api";
const WS_BASE_URL = "http://localhost:3000/ws";

const resolveBaseURL = () => {
    return process.env.NODE_ENV === "production" ? API_BASE_URL_PROD : API_BASE_URL;
};

export const apiInstance: AxiosInstance = axios.create({
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

apiInstance.interceptors.response.use(undefined, async (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401 && error.config) {
        await refreshToken();
        return apiInstance(error.config); // Gửi lại request ban đầu
    }

    throw error;
});

apiInstance.interceptors.response.use(
    (res) => res,
    (err: unknown) => {
      if (isAxiosError<ApiErrorShape>(err)) {
        const status = err.response?.status ?? 0;
        const message = err.response?.data?.error ?? err.response?.data?.message ?? err.message;
  
        if (status === 401 && typeof window !== "undefined") {
          window.location.href = "/login";
        }
  
        return Promise.reject(Object.assign(new Error(message), { status, data: err.response?.data }));
      }
  
      return Promise.reject(err); // unknown vẫn được trả ra
    }
  );

export async function get<T>(url: string, cfg?: AxiosRequestConfig) {
    const { data } = await apiInstance.get<T>(url, cfg);
    console.log("GET request to:", resolveBaseURL() + url, "Response data:", data);
    return data;
}
export async function post<T, D = unknown>(url: string, body?: D, cfg?: AxiosRequestConfig) {
    const { data } = await apiInstance.post<T>(url, body, cfg);
    console.log("POST request to:", resolveBaseURL() + url);
    return data;
}
export async function put<T, D = unknown>(url: string, body?: D, cfg?: AxiosRequestConfig) {
    const { data } = await apiInstance.put<T>(url, body, cfg);
    return data;
}
export async function del<T>(url: string, cfg?: AxiosRequestConfig) {
    const { data } = await apiInstance.delete<T>(url, cfg);
    return data;
}
export async function patch<T, D = unknown>(url: string, body?: D, cfg?: AxiosRequestConfig) {
    const { data } = await apiInstance.patch<T>(url, body, cfg);
    return data;
}
