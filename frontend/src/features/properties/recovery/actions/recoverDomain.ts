import { recover } from "../../../application/recovery/runtime/recoveryRuntime";

export function recoverPropertiesDomain(): boolean {
  return recover({
    scope: "resource",
    reason: "properties-resource-recovery",
    resourceType: "properties",
  });
}
