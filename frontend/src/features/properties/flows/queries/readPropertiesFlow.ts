import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readPropertiesFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "properties",
    "properties",
    query,
  );
}
