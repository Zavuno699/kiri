import {
  getDashboardGlobalState,
} from "./getDashboardGlobalState";

export function DashboardGlobalStatus() {
  const state =
    getDashboardGlobalState();

  return {
    domain:
      "dashboard",

    state,
  };
}
