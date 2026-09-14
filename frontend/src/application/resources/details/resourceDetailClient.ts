import type {
  ResourceClient,
  ResourceRequest,
} from "../clients/resourceClient";

export type ResourceDetailResponse<T> = {
  data?: T;
};

export async function readResourceDetail<T>(
  client: ResourceClient,
  request: ResourceRequest,
): Promise<T | undefined> {
  if (!client.execute) {
    return undefined;
  }

  const result =
    await client.execute<ResourceDetailResponse<T>>(
      request,
    );

  return result.data?.data ?? undefined;
}
