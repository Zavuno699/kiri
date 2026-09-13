import {
  locksResourceAdapter,
} from "../canonical/locksResourceAdapter";

export async function createLocksApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return locksResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
