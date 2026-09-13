import { isNavigationVisible } from "../visibility/isNavigationVisible";
import type { OperatorNavigationItem } from "../navigationItem";

export function filterDangerousNavigation(
  items: OperatorNavigationItem[],
): OperatorNavigationItem[] {
  return items.filter(
    (item) =>
      item.dangerous &&
      isNavigationVisible(item),
  );
}
