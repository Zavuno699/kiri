import type { ProjectionReplayMetrics } from "./replayMetrics";

export function calculateReplayMetrics(
  metrics: ProjectionReplayMetrics,
): ProjectionReplayMetrics {
  if (!metrics.completedAt) {
    return metrics;
  }

  const durationMs = Math.max(
    0,
    Date.parse(metrics.completedAt) -
      Date.parse(metrics.startedAt),
  );

  return {
    ...metrics,
    durationMs,
    eventsPerSecond:
      durationMs > 0
        ? metrics.processedEvents / (durationMs / 1_000)
        : metrics.processedEvents,
  };
}
