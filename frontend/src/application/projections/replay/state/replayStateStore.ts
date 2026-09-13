import type { ReplayRuntimeState } from "./replayState";

const states = new Map<string, ReplayRuntimeState>();

export function setReplayRuntimeState(
  state: ReplayRuntimeState,
): void {
  states.set(state.projectionKey, state);
}

export function getReplayRuntimeState(
  projectionKey: string,
): ReplayRuntimeState | undefined {
  return states.get(projectionKey);
}

export function listReplayRuntimeStates(): ReplayRuntimeState[] {
  return Array.from(states.values());
}

export function clearReplayRuntimeStates(): void {
  states.clear();
}
