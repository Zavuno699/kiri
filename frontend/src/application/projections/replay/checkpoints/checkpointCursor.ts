export type CheckpointCursor = {
  projectionKey: string;
  sequence: number;
  eventId?: string;
};

export function createCheckpointCursor(
  projectionKey: string,
  sequence: number,
  eventId?: string,
): CheckpointCursor {
  return {
    projectionKey,
    sequence,
    eventId,
  };
}
