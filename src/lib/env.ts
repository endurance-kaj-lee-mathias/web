interface Env {
    apiUrl: string;
    wsUrl: string;
}

export const Env: Env = getEnv();

function getEnv(): Env {
    const env: ImportMetaEnv = import.meta.env;
    const apiUrl: string = env.VITE_API_URL;
    const wsUrl: string = env.VITE_WS_URL;
    return { apiUrl, wsUrl } as Env;
}
