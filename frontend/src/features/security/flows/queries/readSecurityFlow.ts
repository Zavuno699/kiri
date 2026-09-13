import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readSecurityFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "security",
    "security",
    query,
  );
}
