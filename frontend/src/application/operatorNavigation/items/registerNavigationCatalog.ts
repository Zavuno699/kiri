import { OPERATOR_NAVIGATION_CATALOG } from "../navigationCatalog";
import { registerNavigationItem } from "./navigationRegistry";

export function registerOperatorNavigation(): void {
  for (const item of OPERATOR_NAVIGATION_CATALOG) {
    registerNavigationItem(item);
  }
}
