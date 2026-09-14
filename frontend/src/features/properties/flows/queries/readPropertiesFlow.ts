import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readPropertiesFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "properties",
    "properties",
    undefined,
  );
  return result as T;
}
