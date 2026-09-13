import {
  selectCommandEventTrace,
} from "../../selectors/selectCommandEventTrace";

export function getLeasePaymentTrace() {
  return selectCommandEventTrace(
    "payment.refresh",
  );
}
