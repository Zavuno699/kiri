import {
  executeWorkspaceCommand,
} from "./executeWorkspaceCommand";

export async function executeSecurityWorkspaceCommand<
  TResult = unknown,
>(
  capability:
    | "security.control"
    | "recovery.execute",
  command: unknown,
): Promise<TResult> {
  return executeWorkspaceCommand<TResult>(
    capability,
    command,
  );
}
