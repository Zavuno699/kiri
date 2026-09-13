import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getPaymentsEventTimeline() {
  return selectEventTimeline(
    "payments",
  );
}
