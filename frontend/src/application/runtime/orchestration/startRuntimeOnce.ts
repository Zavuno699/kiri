import {
  getRuntimeControlState,
} from "../control/runtimeControlStore";

import {
  initializeUnifiedRuntime,
} from "./initializeUnifiedRuntime";

let initialized = false;

export function startRuntimeOnce(): void {
  const state =
    getRuntimeControlState();

  if (
    initialized ||
    state.started
  ) {
    return;
  }

  initialized = true;

  initializeUnifiedRuntime();
}
