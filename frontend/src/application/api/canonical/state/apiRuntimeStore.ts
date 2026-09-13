import type {
  ApiRuntimeState,
} from "./apiRuntimeState";

let state: ApiRuntimeState = {
  initialized: false,
  resourceCount: 0,
  operationCount: 0,
  lastInitializedAt: null,
};

export function getApiRuntimeState(): ApiRuntimeState {
  return state;
}

export function setApiRuntimeState(
  next: ApiRuntimeState,
): void {
  state = next;
}
