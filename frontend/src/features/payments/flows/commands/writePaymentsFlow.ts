import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writePaymentsFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "payments",
    "payments",
    command,
    "payments.write",
  );
}
