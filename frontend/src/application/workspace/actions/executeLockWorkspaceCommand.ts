import {
  executeWorkspaceCommand,
} from "./executeWorkspaceCommand";

export async function executeLockWorkspaceCommand<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return executeWorkspaceCommand<TResult>(
    "locks.command",
    command,
  );
}
