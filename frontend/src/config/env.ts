const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
const appName = import.meta.env.VITE_APP_NAME ?? "KiriLock"

export const env = {
  apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
  appName,
} as const
