import {
  getPaymentsPageState,
} from "../state/paymentsPageState";

import {
  getPaymentsPageActions,
} from "../actions/getPaymentsPageActions";

export function createPaymentsViewModel() {
  const state =
    getPaymentsPageState();

  return {
    domain:
      "payments",

    title:
      "Payments",

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
      getPaymentsPageActions(),
  };
}
