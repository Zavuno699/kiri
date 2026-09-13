import { httpRequest } from "../../api/services/httpService"

export interface ApplicationClient {
  get<T>(url: string): Promise<T>
  post<T>(
    url: string,
    body: unknown,
  ): Promise<T>
}

export const applicationClient: ApplicationClient = {
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
