import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getLocksEventTimeline() {
  return selectEventTimeline(
    "locks",
  );
}
