import {
  registerOperatorNavigation,
} from "../operatorNavigation/items/registerNavigationCatalog";

import {
  registerOperatorActions,
} from "../operatorActions/actions/registerActionCatalog";

import {
  initializeOperatorNavigation,
} from "../operatorNavigation/runtime/navigationRuntime";

import {
  initializeOperatorActions,
} from "../operatorActions/runtime/actionRuntime";

export function registerOperatorControlPlane(): void {
  registerOperatorNavigation();
  registerOperatorActions();

  initializeOperatorNavigation();
  initializeOperatorActions();
}
