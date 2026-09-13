import type {
  HandlerRuntimeState,
} from "./handlerRuntimeState";

let state: HandlerRuntimeState = {
  initialized: false,
  commandHandlers: 0,
  queryHandlers: 0,
  eventHandlers: 0,
  missingCommands: [],
  missingQueries: [],
};

export function getHandlerRuntimeState(): HandlerRuntimeState {
  return state;
}

export function setHandlerRuntimeState(
  next: HandlerRuntimeState,
): void {
  state = next;
}
