import {
  getDevicesEventTimeline,
} from "../../../application/eventStream/adapters/devicesEventAdapter";

export function selectDevicesEventTimeline() {
  return getDevicesEventTimeline();
}
