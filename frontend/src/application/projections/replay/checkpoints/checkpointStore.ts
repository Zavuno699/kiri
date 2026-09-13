import type { ProjectionReplayCheckpoint } from "./projectionReplayCheckpoint";

const checkpoints = new Map<
  string,
  ProjectionReplayCheckpoint
>();

export function saveProjectionReplayCheckpoint(
  checkpoint: ProjectionReplayCheckpoint,
): void {
  checkpoints.set(checkpoint.projectionKey, checkpoint);
}

export function getProjectionReplayCheckpoint(
  projectionKey: string,
): ProjectionReplayCheckpoint | undefined {
  return checkpoints.get(projectionKey);
}

export function listProjectionReplayCheckpoints():
  ProjectionReplayCheckpoint[] {
  return Array.from(checkpoints.values());
}

export function clearProjectionReplayCheckpoints(): void {
  checkpoints.clear();
}
