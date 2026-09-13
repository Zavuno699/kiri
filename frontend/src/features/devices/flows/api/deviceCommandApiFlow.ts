import {
  commandDeviceFlow,
} from "../commands/commandDeviceFlow";

export async function deviceCommandApiFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return commandDeviceFlow<TResult>(
    command,
  );
}
