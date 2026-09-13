import {
  propertiesResourceAdapter,
} from "../canonical/propertiesResourceAdapter";

export async function deletePropertiesApi<
  TResult = unknown,
>(
  id: string,
) {
  return propertiesResourceAdapter.remove<TResult>(
    id,
  );
}
