import {
  executeWorkspaceCommand,
} from "./executeWorkspaceCommand";

export async function executeDeviceWorkspaceCommand<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return executeWorkspaceCommand<TResult>(
    "devices.command",
    command,
  );
}
