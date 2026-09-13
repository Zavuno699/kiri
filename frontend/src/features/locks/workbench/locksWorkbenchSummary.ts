import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function getLocksWorkbenchSummary(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
