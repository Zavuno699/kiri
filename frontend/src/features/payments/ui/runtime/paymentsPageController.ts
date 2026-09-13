import {
  loadPaymentsPage,
} from "./loadPaymentsPage";

import {
  getPaymentsPageState,
} from "../state/paymentsPageState";

import {
  markDomainPageStale,
} from "../../../application/ui/runtime/markDomainPageStale";

export const paymentsPageController = {
  load:
    loadPaymentsPage,

  state:
    getPaymentsPageState,

  invalidate() {
    markDomainPageStale(
      "payments",
    );
  },
};
