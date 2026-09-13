import type { OperatorNavigationItem } from "../navigationItem";

export interface OperatorNavigationState {
  initialized: boolean;
  items: OperatorNavigationItem[];
  visibleItems: OperatorNavigationItem[];
  restrictedItems: OperatorNavigationItem[];
}
