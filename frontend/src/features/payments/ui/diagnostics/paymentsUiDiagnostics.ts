import {
  getPaymentsPageState,
} from "../state/paymentsPageState";

import {
  getPaymentsPageActions,
} from "../actions/getPaymentsPageActions";

export function getPaymentsUiDiagnostics() {
  return {
    domain:
      "payments",

    state:
      getPaymentsPageState(),

    actions:
      getPaymentsPageActions(),
  };
}
