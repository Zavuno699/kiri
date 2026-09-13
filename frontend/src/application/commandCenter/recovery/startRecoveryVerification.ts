import {
  updateRecovery,
} from "./recoveryStore";

export function startRecoveryVerification(
  recoveryId: string,
): void {
  updateRecovery(
    recoveryId,
    {
      status:
        "verifying",
    },
  );
}
