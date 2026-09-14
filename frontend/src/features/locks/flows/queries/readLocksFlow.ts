import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readLocksFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "locks",
    "locks",
    undefined,
  );
  return result as T;
}
