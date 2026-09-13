import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getDashboardWorkflows() {
  return selectWorkflows(
    "dashboard",
  );
}
