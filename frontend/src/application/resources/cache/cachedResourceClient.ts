import type {
  ResourceClient,
  ResourceRequest,
} from "../clients/resourceClient";
import { resourceCache } from "./resourceCache";

export interface CachedResourceClient extends ResourceClient {}

export function createCachedResourceClient(
  client: ResourceClient,
): CachedResourceClient {
  return {
    async execute<T>(
      request: ResourceRequest,
    ) {
      const key = `${request.method ?? "GET"}:${request.url}`;

      const cached = resourceCache.get<T>(key);
      if (cached) {
        return {
          data: cached.value,
          status: 200,
          ok: true,
        };
      }

      const result =
        await client.execute<T>(request);

      if (result.ok && result.data !== undefined) {
        resourceCache.set<T>(key, {
          value: result.data,
          createdAt: Date.now(),
          request,
        });
      }

      return result;
    },
  };
}
