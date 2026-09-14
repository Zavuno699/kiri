import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverLeasesDomain(): boolean {
  return recover("leases").recovered;
}
