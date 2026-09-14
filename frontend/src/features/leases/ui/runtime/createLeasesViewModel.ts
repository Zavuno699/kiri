import {
  getLeasesPageState,
} from "../state/leasesPageState";

import {
  getLeasesPageActions,
} from "../actions/getLeasesPageActions";

export function createLeasesViewModel() {
  const state =
    getLeasesPageState();

  return {
    domain:
      "leases",

    title:
      "Leases",

    data:
      state.data?.data ??
      null,

    status:
      state.runtime?.ready
        ? "ready"
        : state.runtime?.loading
          ? "loading"
          : state.runtime?.error
            ? "error"
            : "idle",

    error:
      state.runtime?.error ??
      null,

    actions:
      getLeasesPageActions(),
  };
}
