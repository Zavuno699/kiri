import {
  readDevicesFlow,
} from "../queries/readDevicesFlow";

export async function readDevicesApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readDevicesFlow<T>(
    query,
  );
}
