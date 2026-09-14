import type {
  ResourceClient,
  ResourceRequest,
  ResourceResponse,
} from "./resourceClient";

export function createResourceClient(): ResourceClient {
  return {
    async list<T>(): Promise<T[]> {
      return [];
    },
    async get(_id: string): Promise<unknown | undefined> {
      return undefined;
    },
    async execute<T>(
      _request: ResourceRequest,
    ): Promise<ResourceResponse<T>> {
      // For now, return a mock response since we don't have actual API endpoints
      return {
        data: undefined as T,
        status: 200,
        ok: true,
      };
    },
  };
}
