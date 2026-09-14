import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readDevicesFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "devices",
    "devices",
    undefined,
  );
  return result as T;
}
