import {
  selectOperationalEntity,
} from "../../../application/operationalViews/selectors/selectOperationalEntity";

export function getPropertiesWorkbenchSummary(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
