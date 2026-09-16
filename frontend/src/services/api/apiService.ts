import {
  requestJson,
} from "../../infrastructure/http/httpClientBoundary"

export const apiService = {
  get<T>(url: string) {
    return requestJson<T>(url, {
      method: "GET",
      useAuth: true,
    })
  },

  post<T>(
    url: string,
    body: unknown,
  ) {
    return requestJson<T>(url, {
      method: "POST",
      body,
      useAuth: true,
    })
  },
}
