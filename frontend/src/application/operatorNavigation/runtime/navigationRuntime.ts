import { OPERATOR_NAVIGATION_CATALOG } from "../navigationCatalog";
import { filterOperatorNavigation } from "../filtering/filterNavigation";
import {
  getOperatorNavigationState,
  setOperatorNavigationState,
} from "../state/navigationStore";

export function initializeOperatorNavigation(): void {
  const visibleItems = filterOperatorNavigation(
    OPERATOR_NAVIGATION_CATALOG,
  );

  const restrictedItems =
    OPERATOR_NAVIGATION_CATALOG.filter(
      (item) => !visibleItems.includes(item),
    );

  setOperatorNavigationState({
    initialized: true,
    items: OPERATOR_NAVIGATION_CATALOG,
    visibleItems,
    restrictedItems,
  });
}

export function refreshOperatorNavigation(): void {
  initializeOperatorNavigation();
}

export function navigationReady(): boolean {
  return getOperatorNavigationState().initialized;
}
