import {
  hydrateEntityWorkbench,
} from "../../../application/operationalViews/workbench/hydrateEntityWorkbench";

export function openPropertiesWorkbench(
  entityId: string,
): void {
  hydrateEntityWorkbench(
    entityId,
  );
}
