import type { ProjectionReplayCheckpoint } from "../checkpoints/projectionReplayCheckpoint";
import type { ProjectionReplayRecovery } from "./replayRecoveryState";

export function determineReplayRecovery(
  projectionKey: string,
  checkpoint: ProjectionReplayCheckpoint | undefined,
  sourceSequence: number,
  now = new Date(),
): ProjectionReplayRecovery {
  if (!checkpoint) {
    return {
      projectionKey,
      state: "rebuild",
      targetSequence: sourceSequence,
      reason: "No replay checkpoint exists",
      decidedAt: now.toISOString(),
    };
  }

  if (checkpoint.lastEventSequence > sourceSequence) {
    return {
      projectionKey,
      state: "rewind",
      checkpointSequence: checkpoint.lastEventSequence,
      targetSequence: sourceSequence,
      reason: "Checkpoint is ahead of source sequence",
      decidedAt: now.toISOString(),
    };
  }

  if (checkpoint.lastEventSequence === sourceSequence) {
    return {
      projectionKey,
      state: "none",
      checkpointSequence: checkpoint.lastEventSequence,
      targetSequence: sourceSequence,
      decidedAt: now.toISOString(),
    };
  }

  return {
    projectionKey,
    state: "resume",
    checkpointSequence: checkpoint.lastEventSequence,
    targetSequence: sourceSequence,
    decidedAt: now.toISOString(),
  };
}
