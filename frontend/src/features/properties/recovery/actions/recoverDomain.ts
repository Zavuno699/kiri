import { recover } from "../../../../application/recovery/runtime/recoveryRuntime";

export function recoverPropertiesDomain(): boolean {
  const result = recover("properties");
  return result.recovered;
}
