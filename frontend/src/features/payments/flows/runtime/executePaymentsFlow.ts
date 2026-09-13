import {
  writePaymentsFlow,
} from "../commands/writePaymentsFlow";

export async function executePaymentsFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return writePaymentsFlow<TResult>(
    command,
  );
}
