import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getLocksWorkflows() {
  return selectWorkflows(
    "locks",
  );
}
