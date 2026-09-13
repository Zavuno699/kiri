import {
  recoverSecurityFlow,
} from "../commands/recoverSecurityFlow";

export async function securityRecoveryApiFlow<
  TResult = unknown,
>(
  command: unknown,
): Promise<TResult> {
  return recoverSecurityFlow<TResult>(
    command,
  );
}
