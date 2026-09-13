import {
  selectEventTimeline,
} from "../selectors/selectEventTimeline";

export function getPropertiesEventTimeline() {
  return selectEventTimeline(
    "properties",
  );
}
