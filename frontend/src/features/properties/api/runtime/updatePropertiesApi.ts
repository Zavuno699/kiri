import {
  propertiesResourceAdapter,
} from "../canonical/propertiesResourceAdapter";

export async function updatePropertiesApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return propertiesResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
