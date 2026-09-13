import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectGlobalOperational(): boolean {
  return getGlobalState()
    .operational;
}
