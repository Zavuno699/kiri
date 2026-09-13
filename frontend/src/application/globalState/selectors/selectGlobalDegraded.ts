import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectGlobalDegraded(): boolean {
  return getGlobalState()
    .degraded;
}
