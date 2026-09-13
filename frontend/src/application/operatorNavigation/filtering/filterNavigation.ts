import { isNavigationVisible } from "../visibility/isNavigationVisible";
import type { OperatorNavigationItem } from "../navigationItem";

export function filterOperatorNavigation(
  items: OperatorNavigationItem[],
): OperatorNavigationItem[] {
  return items.filter(isNavigationVisible);
}
