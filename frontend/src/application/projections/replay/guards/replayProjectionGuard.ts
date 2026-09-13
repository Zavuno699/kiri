export type ReplayProjectionGuardResult = {
  allowed: boolean;
  reason?: string;
};

export function evaluateReplayProjectionGuard(
  projectionKey: string,
  hasCheckpoint: boolean,
  forceRebuild = false,
): ReplayProjectionGuardResult {
  if (!projectionKey.trim()) {
    return {
      allowed: false,
      reason: "Projection key is required",
    };
  }

  if (hasCheckpoint && !forceRebuild) {
    return {
      allowed: true,
    };
  }

  return {
    allowed: true,
  };
}
