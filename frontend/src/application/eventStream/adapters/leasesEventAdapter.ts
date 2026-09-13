import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getLeasesEventTimeline() {
  return selectEventTimeline(
    "leases",
  );
}
