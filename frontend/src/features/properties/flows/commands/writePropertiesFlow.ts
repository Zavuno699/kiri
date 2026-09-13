import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writePropertiesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "properties",
    "properties",
    command,
    "properties.write",
  );
}
