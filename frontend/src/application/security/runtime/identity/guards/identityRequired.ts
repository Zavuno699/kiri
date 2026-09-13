import { getSecurityRuntimeState } from "../../securityRuntimeStore"

export function identityRequired(): boolean {
  return getSecurityRuntimeState().identity.authenticated
}
