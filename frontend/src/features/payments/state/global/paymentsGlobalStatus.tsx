import {
  getPaymentsGlobalState,
} from "./getPaymentsGlobalState";

export function PaymentsGlobalStatus() {
  const state =
    getPaymentsGlobalState();

  return {
    domain:
      "payments",

    state,
  };
}
