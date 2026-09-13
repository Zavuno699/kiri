import {
  commandDeviceFlow,
} from "../commands/commandDeviceFlow";

export async function executeDeviceCommandFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return commandDeviceFlow<TResult>(
    command,
  );
}
