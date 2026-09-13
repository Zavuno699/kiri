import type {
  ApiHealthState,
} from "../contracts/apiHealth";

let state: ApiHealthState = {
  initialized: false,
  reachable: false,
  degraded: false,
  reason: null,
  checkedAt: null,
};

export function getApiRuntimeState(): ApiHealthState {
  return state;
}

export function setApiRuntimeState(
  next: ApiHealthState,
): void {
  state = next;
}
