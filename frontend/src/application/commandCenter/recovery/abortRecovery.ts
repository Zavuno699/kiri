import {
  updateRecovery,
} from "./recoveryStore";

export function abortRecovery(
  recoveryId: string,
  reason?: string,
): void {
  updateRecovery(
    recoveryId,
    {
      status:
        "aborted",
      completedAt:
        new Date().toISOString(),
      reason:
        reason ??
        null,
    },
  );
}
