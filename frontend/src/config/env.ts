const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
const identityServiceUrl = import.meta.env.VITE_IDENTITY_SERVICE_URL ?? "http://localhost:8081"
const appName = import.meta.env.VITE_APP_NAME ?? "KiriLock"

export const env = {
  apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
  identityServiceUrl: identityServiceUrl.replace(/\/+$/, ""),
  appName,
} as const
