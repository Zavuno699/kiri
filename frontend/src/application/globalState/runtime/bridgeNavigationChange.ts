import {
  applyGlobalAction,
} from "../reducers/applyGlobalAction";

export function bridgeNavigationChange(
  route: string,
): void {
  applyGlobalAction({
    type:
      "navigation.route.changed",
    payload:
      route,
    source:
      "ui",
  });
}
