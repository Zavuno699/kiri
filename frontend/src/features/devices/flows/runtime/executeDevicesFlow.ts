import {
  writeDevicesFlow,
} from "../commands/writeDevicesFlow";

export async function executeDevicesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writeDevicesFlow<TResult>(
    command,
  );
}
