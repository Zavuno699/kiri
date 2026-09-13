import {
  writeLocksFlow,
} from "../commands/writeLocksFlow";

export async function executeLocksFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writeLocksFlow<TResult>(
    command,
  );
}
