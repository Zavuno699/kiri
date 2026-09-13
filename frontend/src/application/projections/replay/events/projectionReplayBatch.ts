import type { ProjectionReplayEvent } from "./projectionReplayEvent";

export type ProjectionReplayBatch = {
  batchId: string;
  events: ProjectionReplayEvent[];
  firstSequence: number;
  lastSequence: number;
  createdAt: string;
};
