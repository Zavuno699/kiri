import {
  flowCommand,
} from "../../../application/flows/commands/flowCommand";

export async function recoverSecurityFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowCommand<TResult>(
    command,
    "recovery.execute",
  );
}
