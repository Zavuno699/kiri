import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readDashboardFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "dashboard",
    "dashboard",
    query,
  );
}
