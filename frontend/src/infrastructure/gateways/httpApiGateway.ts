import type {
  ApiGateway,
} from "../../application/gateways/apiGateway"
import {
  requestJson,
} from "../http/httpClientBoundary"

export const httpApiGateway:
  ApiGateway = {
  get<T>(
    endpoint: string,
  ): Promise<T> {
    return requestJson<T>(
      endpoint,
    )
  },

  post<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T> {
    return requestJson<T>(
      endpoint,
      {
        method: "POST",
        body: payload,
      },
    )
  },

  put<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T> {
    return requestJson<T>(
      endpoint,
      {
        method: "PUT",
        body: payload,
      },
    )
  },

  patch<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T> {
    return requestJson<T>(
      endpoint,
      {
        method: "PATCH",
        body: payload,
      },
    )
  },
}
