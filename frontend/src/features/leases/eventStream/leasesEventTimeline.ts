import {
  getLeasesEventTimeline,
} from "../../../application/eventStream/adapters/leasesEventAdapter";

export function selectLeasesEventTimeline() {
  return getLeasesEventTimeline();
}
