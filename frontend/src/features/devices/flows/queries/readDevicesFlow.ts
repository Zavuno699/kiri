import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readDevicesFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "devices",
    "devices",
    query,
  );
}
