import {
  propertiesResourceAdapter,
} from "../canonical/propertiesResourceAdapter";

export async function getPropertiesApi<T = unknown>(
  id: string,
) {
  return propertiesResourceAdapter.get<T>(
    id,
  );
}
