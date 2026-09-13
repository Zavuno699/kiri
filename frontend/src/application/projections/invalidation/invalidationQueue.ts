import type { ProjectionInvalidation } from "./projectionInvalidation";

const queue: ProjectionInvalidation[] = [];

export function enqueueProjectionInvalidation(
  invalidation: ProjectionInvalidation,
): void {
  queue.push(invalidation);
}

export function dequeueProjectionInvalidation():
  | ProjectionInvalidation
  | undefined {
  return queue.shift();
}

export function listProjectionInvalidations(): ProjectionInvalidation[] {
  return [...queue];
}

export function clearProjectionInvalidations(): void {
  queue.length = 0;
}
