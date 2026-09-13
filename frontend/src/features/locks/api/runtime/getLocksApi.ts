import {
  locksResourceAdapter,
} from "../canonical/locksResourceAdapter";

export async function getLocksApi<T = unknown>(
  id: string,
) {
  return locksResourceAdapter.get<T>(
    id,
  );
}
