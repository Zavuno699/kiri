import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function getDashboardWorkbenchSummary(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
