import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getLeasesWorkflows() {
  return selectWorkflows(
    "leases",
  );
}
