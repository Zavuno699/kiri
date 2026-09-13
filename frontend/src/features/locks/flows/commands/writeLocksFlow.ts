import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writeLocksFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "locks",
    "locks",
    command,
    "locks.write",
  );
}
