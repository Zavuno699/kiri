import type { ReplayVerificationResult } from "./replayVerification";

export function verifyReplay(
  projectionKey: string,
  sourceSequence: number,
  materializedSequence: number,
  sourceVersion: number,
  materializedVersion: number,
  now = new Date(),
): ReplayVerificationResult {
  const reasons: string[] = [];

  if (sourceSequence !== materializedSequence) {
    reasons.push(
      `Sequence mismatch: source=${sourceSequence}, materialized=${materializedSequence}`,
    );
  }

  if (sourceVersion !== materializedVersion) {
    reasons.push(
      `Version mismatch: source=${sourceVersion}, materialized=${materializedVersion}`,
    );
  }

  return {
    projectionKey,
    sourceSequence,
    materializedSequence,
    sourceVersion,
    materializedVersion,
    consistent: reasons.length === 0,
    verifiedAt: now.toISOString(),
    reasons,
  };
}
