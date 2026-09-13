import { OPERATOR_ACTION_CATALOG } from "../actionCatalog";
import { registerOperatorAction } from "./actionRegistry";

export function registerOperatorActions(): void {
  for (const action of OPERATOR_ACTION_CATALOG) {
    registerOperatorAction(action);
  }
}
