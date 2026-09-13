import {
  createResourceAdapter,
} from "../resources/resourceAdapterFactory";

export async function readResourceDetail<
  T = unknown,
>(
  resourceKey: string,
  id: string,
) {
  return createResourceAdapter(
    resourceKey,
  ).get<T>(id);
}
