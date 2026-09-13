import {
  writePropertiesFlow,
} from "../commands/writePropertiesFlow";

export async function executePropertiesFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writePropertiesFlow<TResult>(
    command,
  );
}
