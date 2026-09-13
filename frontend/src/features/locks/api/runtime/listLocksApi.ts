import {
  locksResourceAdapter,
} from "../canonical/locksResourceAdapter";

export async function listLocksApi<T = unknown>() {
  return locksResourceAdapter.list<T>();
}
