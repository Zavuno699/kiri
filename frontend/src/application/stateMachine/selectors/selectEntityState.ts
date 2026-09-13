import {
  getEntityState,
} from "../state/entityStateStore";

export function selectEntityState(
  domain: string,
  entityId: string,
) {
  return getEntityState(
    domain,
    entityId,
  );
}
