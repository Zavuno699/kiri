import {
  createResourceAdapter,
} from "../resources/resourceAdapterFactory";

export async function updateResource<
  TBody = unknown,
  TResult = unknown,
>(
  resourceKey: string,
  id: string,
  body: TBody,
) {
  return createResourceAdapter(
    resourceKey,
  ).update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
