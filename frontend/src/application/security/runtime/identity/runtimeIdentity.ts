import { getSecurityRuntimeState } from "../securityRuntimeStore"

export function getRuntimeIdentity(): string | null {
  return getSecurityRuntimeState().identity.principal
}
