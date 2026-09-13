import type { HttpMethod } from "../contracts"

export interface RequestBuilder {
  build<T>(
    method: HttpMethod,
    path: string,
    body?: T,
  ): {
    method: HttpMethod
    path: string
    body?: T
  }
}

export function createRequestBuilder():
  RequestBuilder {
  return {
    build(method, path, body) {
      return {
        method,
        path,
        body,
      }
    },
  }
}
