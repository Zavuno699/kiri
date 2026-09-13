import {
  readSecurityFlow,
} from "../queries/readSecurityFlow";

export async function readSecurityApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readSecurityFlow<T>(
    query,
  );
}
