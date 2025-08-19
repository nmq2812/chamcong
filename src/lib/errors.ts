import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

export type ApiErrorShape = {
    error?: string;
    message?: string;
    status?: number;
};

export function isAxiosError<T = unknown>(e: unknown): e is AxiosError<T> {
    return axios.isAxiosError(e);
}

export function getErrorMessage(e: unknown): string {
    if (isAxiosError<ApiErrorShape>(e)) {
        return (
            e.response?.data?.error ?? e.response?.data?.message ?? e.message
        );
    }
    if (e instanceof ZodError) {
        return e.issues?.[0]?.message ?? "Invalid input";
    }
    if (e instanceof Error) {
        return e.message;
    }
    try {
        return JSON.stringify(e);
    } catch {
        return String(e);
    }
}

export function getHttpStatus(e: unknown, fallback = 400): number {
    if (isAxiosError<ApiErrorShape>(e)) return e.response?.status ?? fallback;
    return fallback;
}
