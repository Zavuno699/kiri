import {
  getGlobalState,
} from "../state/globalStateStore";

export function selectActiveRoute(): string {
  return getGlobalState()
    .activeRoute;
}
