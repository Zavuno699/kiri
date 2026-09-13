import {
  hydrateEntityWorkbench,
} from "../../../application/operationalViews/workbench/hydrateEntityWorkbench";

export function openDashboardWorkbench(
  entityId: string,
): void {
  hydrateEntityWorkbench(
    entityId,
  );
}
