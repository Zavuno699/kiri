import type {
  ResourceClient,
  ResourceRequest,
  ResourceResponse,
} from "./resourceClient";

export function createResourceClient(): ResourceClient {
  return {
    async execute<T>(
      request: ResourceRequest,
    ): Promise<ResourceResponse<T>> {
      const response = await fetch(request.url, {
        method: request.method ?? "GET",
        headers: request.headers,
        body:
          request.body === undefined
            ? undefined
            : JSON.stringify(request.body),
      });

      let data: T | undefined;

      try {
        data = (await response.json()) as T;
      } catch {
        data = undefined;
      }

      return {
        data,
        status: response.status,
        ok: response.ok,
      };
    },
  };
}
