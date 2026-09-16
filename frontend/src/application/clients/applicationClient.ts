import { requestJson } from "../../infrastructure/http/httpClientBoundary"

export interface ApplicationClient {
  get<T>(url: string): Promise<T>
  post<T>(
    url: string,
    body: unknown,
  ): Promise<T>
}

export const applicationClient: ApplicationClient = {
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
