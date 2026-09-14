import type {
  ResourceClient,
  ResourceRequest,
} from "../clients/resourceClient";

export type ResourceCollectionResponse<T> = {
  items?: T[];
  total?: number;
};

export async function readResourceCollection<T>(
  client: ResourceClient,
  request: ResourceRequest,
): Promise<ResourceCollectionResponse<T>> {
  if (!client.execute) {
    return {
      items: [],
      total: 0,
    } as ResourceCollectionResponse<T>;
  }

  const result =
    await client.execute<ResourceCollectionResponse<T>>(
      request,
    );

  return result.data ?? {
    items: [],
    total: 0,
  } as ResourceCollectionResponse<T>;
}
