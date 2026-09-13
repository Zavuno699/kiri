import {
  initializeGlobalState,
} from "./initializeGlobalState";

import {
  synchronizeGlobalStateFromWorkspace,
} from "./synchronizeGlobalStateFromWorkspace";

import {
  synchronizeGlobalStateFromNavigation,
} from "./synchronizeGlobalStateFromNavigation";

import {
  synchronizeGlobalStateFromCommandCenter,
} from "./synchronizeGlobalStateFromCommandCenter";

let started =
  false;

export function orchestrateGlobalState(): void {
  if (!started) {
    initializeGlobalState();
    started =
      true;
  }

  synchronizeGlobalStateFromWorkspace();
  synchronizeGlobalStateFromNavigation();
  synchronizeGlobalStateFromCommandCenter();
}
