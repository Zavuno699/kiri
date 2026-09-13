export type ProjectionReplayMetrics = {
  projectionKey: string;
  totalEvents: number;
  processedEvents: number;
  failedEvents: number;
  lastSequence: number;
  startedAt: string;
  completedAt?: string;
  durationMs?: number;
  eventsPerSecond?: number;
};
