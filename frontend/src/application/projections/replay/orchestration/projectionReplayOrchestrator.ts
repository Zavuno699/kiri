import type { ProjectionReplayEvent } from "../events/projectionReplayEvent";
import type { ProjectionReplayRecovery } from "../recovery/replayRecoveryState";
import type { ProjectionReplayMetrics } from "../metrics/replayMetrics";
import { calculateReplayMetrics } from "../metrics/calculateReplayMetrics";
import {
  createReplayCheckpoint,
} from "../checkpoints/createCheckpoint";
import {
  saveProjectionReplayCheckpoint,
} from "../checkpoints/checkpointStore";
import { setReplayRuntimeState } from "../state/replayStateStore";

export type ProjectionReplayProcessor = (
  event: ProjectionReplayEvent,
) => Promise<void> | void;

export class ProjectionReplayOrchestrator {
  async replay(
    projectionKey: string,
    events: ProjectionReplayEvent[],
    processor: ProjectionReplayProcessor,
    options?: {
      checkpointEvery?: number;
      recovery?: ProjectionReplayRecovery;
      startingVersion?: number;
    },
  ): Promise<ProjectionReplayMetrics> {
    const startedAt = new Date().toISOString();

    setReplayRuntimeState({
      projectionKey,
      state: "replaying",
      startedAt,
      lastSequence: 0,
      processedEvents: 0,
      failedEvents: 0,
    });

    const checkpointEvery =
      options?.checkpointEvery ?? 100;

    let processedEvents = 0;
    let failedEvents = 0;
    let lastSequence = 0;
    let projectionVersion =
      options?.startingVersion ?? 0;

    for (const event of events) {
      if (
        options?.recovery?.state === "resume" &&
        options.recovery.checkpointSequence !== undefined &&
        event.sequence <= options.recovery.checkpointSequence
      ) {
        continue;
      }

      try {
        await processor(event);

        processedEvents += 1;
        lastSequence = event.sequence;
        projectionVersion = Math.max(
          projectionVersion,
          event.eventVersion,
        );

        setReplayRuntimeState({
          projectionKey,
          state:
            processedEvents % checkpointEvery === 0
              ? "checkpointing"
              : "replaying",
          startedAt,
          lastSequence,
          processedEvents,
          failedEvents,
        });

        if (processedEvents % checkpointEvery === 0) {
          const checkpoint =
            createReplayCheckpoint(
              projectionKey,
              lastSequence,
              projectionVersion,
              0,
            );

          saveProjectionReplayCheckpoint(checkpoint);
        }
      } catch (error) {
        failedEvents += 1;

        setReplayRuntimeState({
          projectionKey,
          state: "failed",
          startedAt,
          lastSequence,
          processedEvents,
          failedEvents,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });

        throw error;
      }
    }

    const completedAt = new Date().toISOString();

    const metrics = calculateReplayMetrics({
      projectionKey,
      totalEvents: events.length,
      processedEvents,
      failedEvents,
      lastSequence,
      startedAt,
      completedAt,
    });

    setReplayRuntimeState({
      projectionKey,
      state: "completed",
      startedAt,
      completedAt,
      lastSequence,
      processedEvents,
      failedEvents,
    });

    const finalCheckpoint =
      createReplayCheckpoint(
        projectionKey,
        lastSequence,
        projectionVersion,
        0,
        "completed",
      );

    saveProjectionReplayCheckpoint(finalCheckpoint);

    return metrics;
  }
}
