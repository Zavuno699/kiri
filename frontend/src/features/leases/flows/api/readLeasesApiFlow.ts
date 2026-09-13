import {
  readLeasesFlow,
} from "../queries/readLeasesFlow";

export async function readLeasesApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readLeasesFlow<T>(
    query,
  );
}
