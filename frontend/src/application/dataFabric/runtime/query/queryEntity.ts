import {
  getEntity,
} from "../../entities/entityStore";

export function queryEntity(
  id: string,
) {
  return getEntity(
    id,
  );
}
