import type { ProjectionReplayEvent } from "../events/projectionReplayEvent";

export function assertReplayContinuity(
  previous: ProjectionReplayEvent | undefined,
  next: ProjectionReplayEvent,
): void {
  if (!previous) {
    return;
  }

  if (next.sequence <= previous.sequence) {
    throw new Error(
      `Replay sequence regression: ${previous.sequence} -> ${next.sequence}`,
    );
  }
}
