import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getDevicesEventTimeline() {
  return selectEventTimeline(
    "devices",
  );
}
