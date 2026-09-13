import {
  httpRequest,
} from "../../api/services/httpService"

export const apiService = {
  get<T>(url: string) {
    return httpRequest<T>(url)
  },

  post<T>(
    url: string,
    body: unknown,
  ) {
    return httpRequest<T>(url, {
      method: "POST",
      body,
    })
  },
}
