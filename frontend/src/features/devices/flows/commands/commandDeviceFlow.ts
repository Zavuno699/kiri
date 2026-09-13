import {
  flowCommand,
} from "../../../application/flows/commands/flowCommand";

export async function commandDeviceFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return flowCommand<TResult>(
    command,
    "devices.command",
  );
}
