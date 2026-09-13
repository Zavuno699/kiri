import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writeDevicesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "devices",
    "devices",
    command,
    "devices.write",
  );
}
