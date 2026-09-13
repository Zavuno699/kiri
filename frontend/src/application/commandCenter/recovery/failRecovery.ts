import {
  updateRecovery,
} from "./recoveryStore";

export function failRecovery(
  recoveryId: string,
  reason: string,
): void {
  updateRecovery(
    recoveryId,
    {
      status:
        "failed",
      completedAt:
        new Date().toISOString(),
      reason,
    },
  );
}
