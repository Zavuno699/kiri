import {
  locksResourceAdapter,
} from "../canonical/locksResourceAdapter";

export async function updateLocksApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return locksResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
