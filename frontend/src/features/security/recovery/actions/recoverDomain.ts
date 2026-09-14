import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverSecurityDomain(): boolean {
  const result = recover("security");
  return result.recovered;
}
