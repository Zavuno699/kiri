import {
  createResourceAdapter,
} from "../resources/resourceAdapterFactory";

export async function readResource<
  T = unknown,
>(
  resourceKey: string,
) {
  return createResourceAdapter(
    resourceKey,
  ).list<T>();
}
