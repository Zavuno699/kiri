import {
  hydrateEntityWorkbench,
} from "../../../application/operationalViews/workbench/hydrateEntityWorkbench";

export function openLeasesWorkbench(
  entityId: string,
): void {
  hydrateEntityWorkbench(
    entityId,
  );
}
