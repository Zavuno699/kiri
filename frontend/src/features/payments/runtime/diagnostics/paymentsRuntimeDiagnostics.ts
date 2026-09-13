import {
  getPaymentsRuntimeState,
} from "../state/paymentsRuntimeState";

export function getPaymentsRuntimeDiagnostics() {
  return {
    domain:
      "payments",

    runtime:
      getPaymentsRuntimeState(),
  };
}
