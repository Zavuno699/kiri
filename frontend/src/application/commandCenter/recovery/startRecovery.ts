import {
  updateRecovery,
} from "./recoveryStore";

export function startRecovery(
  recoveryId: string,
): void {
  updateRecovery(
    recoveryId,
    {
      status:
        "executing",
      startedAt:
        new Date().toISOString(),
    },
  );
}
