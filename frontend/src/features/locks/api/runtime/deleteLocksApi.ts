import {
  locksResourceAdapter,
} from "../canonical/locksResourceAdapter";

export async function deleteLocksApi<
  TResult = unknown,
>(
  id: string,
) {
  return locksResourceAdapter.remove<TResult>(
    id,
  );
}
