import {
  getOperationalEntity,
} from "../registry/operationalEntityRegistry";

export function selectOperationalEntity(
  entityId: string,
) {
  return getOperationalEntity(
    entityId,
  );
}
