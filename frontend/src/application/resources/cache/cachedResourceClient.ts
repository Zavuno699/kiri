import type {
  ResourceClient,
  ResourceClientAny,
  ResourceRequest,
  ResourceResponse,
} from "../clients/resourceClient";
import { resourceCache } from "./resourceCache";

export interface CachedResourceClient extends ResourceClientAny {}

export function createCachedResourceClient(
  client: ResourceClient,
): CachedResourceClient {
  return {
    async list() {
      return client.list();
    },
    async get(id: string) {
      return client.get(id);
    },
    async execute<T>(
      request: ResourceRequest,
    ) {
      const key = `${request.type}:${JSON.stringify(request.payload ?? "")}`;

      const cached = resourceCache.get<T>(key);
      if (cached) {
        return {
          data: cached.value,
          status: 200,
          ok: true,
        } as ResourceResponse<T>;
      }

      if (!client.execute) {
        return {
          data: undefined,
          status: 500,
          ok: false,
          error: "Execute not available",
        } as ResourceResponse<T>;
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
