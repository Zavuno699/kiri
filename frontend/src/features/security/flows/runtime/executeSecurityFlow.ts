import {
  writeSecurityFlow,
} from "../commands/writeSecurityFlow";

export async function executeSecurityFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writeSecurityFlow<TResult>(
    command,
  );
}
