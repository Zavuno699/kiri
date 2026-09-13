import {
  getPaymentsEventTimeline,
} from "../../../application/eventStream/adapters/paymentsEventAdapter";

export function selectPaymentsEventTimeline() {
  return getPaymentsEventTimeline();
}
