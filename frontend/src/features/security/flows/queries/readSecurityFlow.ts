import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readSecurityFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "security",
    "security",
    undefined,
  );
  return result as T;
}
