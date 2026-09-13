import {
  setMaterializedEntity,
  type MaterializedEntityRecord,
} from "../materialized/materializedEntityStore";

export function materializeEntity(
  record: MaterializedEntityRecord,
): void {
  setMaterializedEntity(
    record.domain,
    record.id,
    record,
  );
}
