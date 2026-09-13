import {
  updateRecovery,
} from "./recoveryStore";

export function completeRecovery(
  recoveryId: string,
): void {
  updateRecovery(
    recoveryId,
    {
      status:
        "completed",
      completedAt:
        new Date().toISOString(),
    },
  );
}
