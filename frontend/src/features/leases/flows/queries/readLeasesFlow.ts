import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readLeasesFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "leases",
    "leases",
    undefined,
  );
  return result as T;
}
