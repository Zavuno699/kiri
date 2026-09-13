import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getDashboardEventTimeline() {
  return selectEventTimeline(
    "dashboard",
  );
}
