import {
  flowQuery,
} from "../../../application/flows/queries/flowQuery";

export async function readPaymentsFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return flowQuery<T>(
    "payments",
    "payments",
    query,
  );
}
