import {
  flowQuery,
} from "../../../../application/flows/queries/flowQuery";

export async function readPaymentsFlow<T = unknown>(
  _query: unknown,
): Promise<T> {
  const result = await flowQuery<T>(
    "payments",
    "payments",
    undefined,
  );
  return result as T;
}
