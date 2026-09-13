import {
  commandLockFlow,
} from "../commands/commandLockFlow";

export async function executeLockCommandFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return commandLockFlow<TResult>(
    command,
  );
}
