import {
  getLocksPageState,
} from "../state/locksPageState";

import {
  getLocksPageActions,
} from "../actions/getLocksPageActions";

export function createLocksViewModel() {
  const state =
    getLocksPageState();

  return {
    domain:
      "locks",

    title:
      "Locks",

    data:
      state.data?.data ??
      null,

    status:
      state.runtime?.status ??
      "idle",

    error:
      state.runtime?.error ??
      null,

    actions:
      getLocksPageActions(),
  };
}
