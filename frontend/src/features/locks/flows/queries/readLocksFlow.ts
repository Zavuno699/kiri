import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readLocksFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "locks",
    "locks",
    query,
  );
}
