import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getSecurityWorkflows() {
  return selectWorkflows(
    "security",
  );
}
