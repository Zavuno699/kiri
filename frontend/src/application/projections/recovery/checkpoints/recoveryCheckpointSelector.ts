import type { ProjectionReplayCheckpoint } from "../../replay/checkpoints/projectionReplayCheckpoint";

export function selectRecoveryCheckpoint(
  checkpoints: ProjectionReplayCheckpoint[],
  projectionKey: string,
): ProjectionReplayCheckpoint | undefined {
  return checkpoints
    .filter(
      (checkpoint) =>
        checkpoint.projectionKey === projectionKey,
    )
    .sort(
      (left, right) =>
        right.lastEventSequence - left.lastEventSequence,
    )[0];
}
