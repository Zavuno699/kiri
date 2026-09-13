import type {
  BusRuntimeState,
} from "./busRuntimeState";

let state: BusRuntimeState = {
  initialized: false,
  commandHandlers: 0,
  queryHandlers: 0,
  eventHandlers: 0,
  commandReady: false,
  queryReady: false,
  eventReady: false,
  reasons: [],
};

export function getBusRuntimeState(): BusRuntimeState {
  return state;
}

export function setBusRuntimeState(
  next: BusRuntimeState,
): void {
  state = next;
}
