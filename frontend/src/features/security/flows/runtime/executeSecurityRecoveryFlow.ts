import {
  recoverSecurityFlow,
} from "../commands/recoverSecurityFlow";

export async function executeSecurityRecoveryFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return recoverSecurityFlow<TResult>(
    command,
  );
}
