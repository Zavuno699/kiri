import {
  hydrateEntityWorkbench,
} from "../../../application/operationalViews/workbench/hydrateEntityWorkbench";

export function openPaymentsWorkbench(
  entityId: string,
): void {
  hydrateEntityWorkbench(
    entityId,
  );
}
