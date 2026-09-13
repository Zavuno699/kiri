import type { OperatorNavigationState } from "../state/navigationState";

export const selectVisibleNavigation = (
  state: OperatorNavigationState,
) => state.visibleItems;

export const selectRestrictedNavigation = (
  state: OperatorNavigationState,
) => state.restrictedItems;

export const selectNavigationInitialized = (
  state: OperatorNavigationState,
) => state.initialized;
