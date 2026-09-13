import {
  registerOperationalEntityBuilders,
} from "./registerOperationalEntityBuilders";

import {
  hydrateEntityWorkbench,
} from "../workbench/hydrateEntityWorkbench";

let initialized =
  false;

export function initializeOperationalViews(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  registerOperationalEntityBuilders();

  hydrateEntityWorkbench(
    "property",
  );
}
