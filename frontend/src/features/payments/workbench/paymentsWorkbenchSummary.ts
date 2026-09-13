import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function getPaymentsWorkbenchSummary(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
