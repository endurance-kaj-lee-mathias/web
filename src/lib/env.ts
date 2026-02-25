interface Env {
    apiUrl: string;
}

export const Env: Env = getEnv();

function getEnv(): Env {
    const env: ImportMetaEnv = import.meta.env;
    const apiUrl: string = env.VITE_API_URL;
    return { apiUrl } as Env;
}
