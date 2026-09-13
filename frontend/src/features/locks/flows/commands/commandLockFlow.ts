import {
  flowCommand,
} from "../../../application/flows/commands/flowCommand";

export async function commandLockFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowCommand<TResult>(
    command,
    "locks.command",
  );
}
