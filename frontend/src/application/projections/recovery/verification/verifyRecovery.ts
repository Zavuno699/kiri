import type { RecoveryVerification } from "./recoveryVerification";

export function verifyRecovery(
  projectionKey: string,
  finalSequence: number,
  checkpointSequence: number | undefined,
  now = new Date(),
): RecoveryVerification {
  const reasons: string[] = [];

  if (
    checkpointSequence !== undefined &&
    finalSequence < checkpointSequence
  ) {
    reasons.push(
      `Final sequence ${finalSequence} is behind checkpoint ${checkpointSequence}`,
    );
  }

  return {
    projectionKey,
    recovered: reasons.length === 0,
    checkpointSequence,
    finalSequence,
    verifiedAt: now.toISOString(),
    reasons,
  };
}
