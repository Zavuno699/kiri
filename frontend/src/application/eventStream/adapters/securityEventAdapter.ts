import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getSecurityEventTimeline() {
  return selectEventTimeline(
    "security",
  );
}
