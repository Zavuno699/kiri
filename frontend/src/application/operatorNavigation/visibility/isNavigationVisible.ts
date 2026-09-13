import { evaluateNavigationVisibility } from "./navigationVisibility";
import type { OperatorNavigationItem } from "../navigationItem";

export function isNavigationVisible(
  item: OperatorNavigationItem,
): boolean {
  return evaluateNavigationVisibility(item).visible;
}
