import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writeLeasesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "leases",
    "leases",
    command,
    "leases.write",
  );
}
