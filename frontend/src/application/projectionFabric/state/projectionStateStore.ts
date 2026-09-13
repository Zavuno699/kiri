export type ProjectionState = {
  projectionKey: string;
  version: number;
  state: unknown;
  updatedAt: string;
};

const states = new Map<string, ProjectionState>();

export function getProjectionState(
  projectionKey: string,
): ProjectionState | undefined {
  return states.get(projectionKey);
}

export function setProjectionState(
  projectionKey: string,
  state: ProjectionState,
): void {
  states.set(projectionKey, state);
}

export function clearProjectionState(
  projectionKey: string,
): void {
  states.delete(projectionKey);
}
