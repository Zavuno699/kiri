import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function getDevicesWorkbenchSummary(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
