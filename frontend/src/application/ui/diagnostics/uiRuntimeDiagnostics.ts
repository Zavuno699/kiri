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
          state.ready,
      ).length,

    stale:
      states.filter(
        (state) =>
          state.loading,
      ).length,

    errors:
      states.filter(
        (state) =>
          state.error,
      ).length,
  };
}
