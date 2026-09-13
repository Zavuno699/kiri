import {
  createResourceAdapter,
} from "../resources/resourceAdapterFactory";

export async function createResource<
  TBody = unknown,
  TResult = unknown,
>(
  resourceKey: string,
  body: TBody,
) {
  return createResourceAdapter(
    resourceKey,
  ).create<
    TBody,
    TResult
  >(body);
}
