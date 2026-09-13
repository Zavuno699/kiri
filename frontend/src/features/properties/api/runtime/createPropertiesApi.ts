import {
  propertiesResourceAdapter,
} from "../canonical/propertiesResourceAdapter";

export async function createPropertiesApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return propertiesResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
