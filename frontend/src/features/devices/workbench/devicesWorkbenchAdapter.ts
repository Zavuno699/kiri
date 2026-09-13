import {
  hydrateEntityWorkbench,
} from "../../../application/operationalViews/workbench/hydrateEntityWorkbench";

export function openDevicesWorkbench(
  entityId: string,
): void {
  hydrateEntityWorkbench(
    entityId,
  );
}
