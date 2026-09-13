import {
  propertiesResourceAdapter,
} from "../canonical/propertiesResourceAdapter";

export async function listPropertiesApi<T = unknown>() {
  return propertiesResourceAdapter.list<T>();
}
