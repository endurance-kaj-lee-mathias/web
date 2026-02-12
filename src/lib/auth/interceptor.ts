import { getToken } from "@/lib/auth/token";
import type { InternalAxiosRequestConfig } from "axios";

export async function authenticationInterceptor(
    config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
    const token = await getToken();
    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
}
