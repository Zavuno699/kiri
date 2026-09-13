import type {
  ResourceState,
} from "../contracts/resourceState";

const states = new Map<
  string,
  ResourceState
>();

export function registerResourceState(
  state: ResourceState,
): void {
  if (!states.has(state.resourceKey)) {
    states.set(
      state.resourceKey,
      state,
    );
  }
}

export function getResourceState(
  resourceKey: string,
): ResourceState | null {
  return states.get(resourceKey) ?? null;
}

export function setResourceState(
  state: ResourceState,
): void {
  states.set(
    state.resourceKey,
    state,
  );
}

export function listResourceStates(): ResourceState[] {
  return [...states.values()];
}

export function clearResourceStates(): void {
  states.clear();
}
