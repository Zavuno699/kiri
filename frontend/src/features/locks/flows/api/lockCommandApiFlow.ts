import {
  commandLockFlow,
} from "../commands/commandLockFlow";

export async function lockCommandApiFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return commandLockFlow<TResult>(
    command,
  );
}
