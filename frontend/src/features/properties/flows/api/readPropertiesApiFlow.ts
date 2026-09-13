import {
  readPropertiesFlow,
} from "../queries/readPropertiesFlow";

export async function readPropertiesApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readPropertiesFlow<T>(
    query,
  );
}
