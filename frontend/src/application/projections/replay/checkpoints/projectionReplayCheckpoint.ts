export type ProjectionReplayCheckpoint = {
  checkpointId: string;
  projectionKey: string;
  lastEventSequence: number;
  lastEventId?: string;
  projectionVersion: number;
  entityCount: number;
  capturedAt: string;
  status: "active" | "completed" | "failed";
};
