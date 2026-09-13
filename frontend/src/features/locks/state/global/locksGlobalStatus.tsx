import {
  getLocksGlobalState,
} from "./getLocksGlobalState";

export function LocksGlobalStatus() {
  const state =
    getLocksGlobalState();

  return {
    domain:
      "locks",

    state,
  };
}
