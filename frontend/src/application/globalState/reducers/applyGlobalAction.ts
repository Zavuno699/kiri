import {
  updateGlobalState,
} from "../state/globalStateStore";

import type {
  GlobalStateAction,
} from "../contracts/stateAction";

export function applyGlobalAction(
  action: GlobalStateAction,
): void {
  switch (
    action.type
  ) {
    case "workspace.domain.selected":
      updateGlobalState({
        activeDomain:
          action.domain ??
          null,
      });
      break;

    case "navigation.route.changed":
      updateGlobalState({
        activeRoute:
          String(
            action.payload ??
              "/",
          ),
      });
      break;

    case "workspace.resource.selected":
      updateGlobalState({
        selectedResourceId:
          action.payload
            ? String(
                action.payload,
              )
            : null,
      });
      break;

    case "global.runtime.degraded":
      updateGlobalState({
        degraded:
          true,
        operational:
          false,
      });
      break;

    case "global.runtime.operational":
      updateGlobalState({
        degraded:
          false,
        operational:
          true,
      });
      break;

    default:
      break;
  }
}
