import { authenticationInterceptor } from "@/lib/auth/interceptor";
import axios, { type AxiosInstance } from "axios";

export function client(url: string): AxiosInstance {
    const client = axios.create({ baseURL: url });
    client.interceptors.request.use(authenticationInterceptor);
    return client;
}
