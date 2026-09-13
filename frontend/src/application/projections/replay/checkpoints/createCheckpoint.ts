import type { ProjectionReplayCheckpoint } from "./projectionReplayCheckpoint";

export function createReplayCheckpoint(
  projectionKey: string,
  lastEventSequence: number,
  projectionVersion: number,
  entityCount: number,
  status: ProjectionReplayCheckpoint["status"] = "active",
  now = new Date(),
): ProjectionReplayCheckpoint {
  return {
    checkpointId: `${projectionKey}:${lastEventSequence}:${now.getTime()}`,
    projectionKey,
    lastEventSequence,
    projectionVersion,
    entityCount,
    capturedAt: now.toISOString(),
    status,
  };
}
