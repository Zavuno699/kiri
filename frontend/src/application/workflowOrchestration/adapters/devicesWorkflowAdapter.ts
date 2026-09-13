import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getDevicesWorkflows() {
  return selectWorkflows(
    "devices",
  );
}
