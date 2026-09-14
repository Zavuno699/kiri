import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readDashboardFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "dashboard",
    "dashboard",
    undefined,
  );
  return result as T;
}
