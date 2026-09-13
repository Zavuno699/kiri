import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getPaymentsWorkflows() {
  return selectWorkflows(
    "payments",
  );
}
