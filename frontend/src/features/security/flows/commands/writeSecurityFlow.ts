import {
  flowApiMutation,
} from "../../../application/flows/api/flowApiMutation";

export async function writeSecurityFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowApiMutation<TResult>(
    "security",
    "security",
    command,
    "security.control",
  );
}
