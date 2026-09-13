import {
  createResourceAdapter,
} from "../resources/resourceAdapterFactory";

export async function deleteResource<
  TResult = unknown,
>(
  resourceKey: string,
  id: string,
) {
  return createResourceAdapter(
    resourceKey,
  ).remove<TResult>(id);
}
