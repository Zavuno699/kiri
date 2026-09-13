export type ProjectionReplayState =
  | "idle"
  | "preparing"
  | "replaying"
  | "checkpointing"
  | "verifying"
  | "completed"
  | "failed"
  | "paused";

export type ReplayRuntimeState = {
  projectionKey: string;
  state: ProjectionReplayState;
  startedAt?: string;
  completedAt?: string;
  lastSequence: number;
  processedEvents: number;
  failedEvents: number;
  error?: string;
};
