import {
  readPaymentsFlow,
} from "../queries/readPaymentsFlow";

export async function readPaymentsApiFlow<T = unknown>(
  query: unknown,
): Promise<T> {
  return readPaymentsFlow<T>(
    query,
  );
}
