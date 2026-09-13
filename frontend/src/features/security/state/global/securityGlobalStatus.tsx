import {
  getSecurityGlobalState,
} from "./getSecurityGlobalState";

export function SecurityGlobalStatus() {
  const state =
    getSecurityGlobalState();

  return {
    domain:
      "security",

    state,
  };
}
