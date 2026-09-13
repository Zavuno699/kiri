import {
  getSecurityPageState,
} from "../state/securityPageState";

import {
  getSecurityPageActions,
} from "../actions/getSecurityPageActions";

export function createSecurityViewModel() {
  const state =
    getSecurityPageState();

  return {
    domain:
      "security",

    title:
      "Security",

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
      getSecurityPageActions(),
  };
}
