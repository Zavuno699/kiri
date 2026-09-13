import {
  selectOperationalEntity,
} from "../selectors/selectOperationalEntity";

export function queryWorkbenchEntity(
  entityId: string,
) {
  return selectOperationalEntity(
    entityId,
  );
}
