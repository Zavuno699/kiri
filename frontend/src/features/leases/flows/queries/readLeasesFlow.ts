import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readLeasesFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "leases",
    "leases",
    query,
  );
}
