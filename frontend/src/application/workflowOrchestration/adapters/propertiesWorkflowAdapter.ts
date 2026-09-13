import {
  selectWorkflows,
} from "../selectors/selectWorkflows";

export function getPropertiesWorkflows() {
  return selectWorkflows(
    "properties",
  );
}
