import {
  listIdempotencyRecords,
} from "../idempotency/idempotencyStore";

export function selectIdempotencyRecords() {
  return listIdempotencyRecords();
}
