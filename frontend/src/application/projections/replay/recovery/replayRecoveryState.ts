export type ReplayRecoveryState =
  | "none"
  | "resume"
  | "rewind"
  | "rebuild"
  | "manual";

export type ProjectionReplayRecovery = {
  projectionKey: string;
  state: ReplayRecoveryState;
  checkpointSequence?: number;
  targetSequence?: number;
  reason?: string;
  decidedAt: string;
};
