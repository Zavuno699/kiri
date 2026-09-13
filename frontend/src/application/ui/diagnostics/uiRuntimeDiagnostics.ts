import {
  listPageRuntimeStates,
} from "../state/pageRuntimeStore";

import {
  listDomainPages,
} from "../registry/domainPageRegistry";

export function getUiRuntimeDiagnostics() {
  const states =
    listPageRuntimeStates();

  return {
    pages:
      listDomainPages(),

    states,

    ready:
      states.filter(
        (state) =>
          state.status ===
          "ready",
      ).length,

    stale:
      states.filter(
        (state) =>
          state.status ===
          "stale",
      ).length,

    errors:
      states.filter(
        (state) =>
          state.status ===
          "error",
      ).length,
  };
}
