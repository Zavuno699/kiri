import {
  readDashboardFlow,
} from "../queries/readDashboardFlow";

export async function readDashboardApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readDashboardFlow<T>(
    query,
  );
}
