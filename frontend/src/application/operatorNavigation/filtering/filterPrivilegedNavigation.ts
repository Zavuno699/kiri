import { isNavigationVisible } from "../visibility/isNavigationVisible";
import type { OperatorNavigationItem } from "../navigationItem";

export function filterPrivilegedNavigation(
  items: OperatorNavigationItem[],
): OperatorNavigationItem[] {
  return items.filter(
    (item) =>
      item.privileged &&
      isNavigationVisible(item),
  );
}
