import {
  readLocksFlow,
} from "../queries/readLocksFlow";

export async function readLocksApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readLocksFlow<T>(
    query,
  );
}
