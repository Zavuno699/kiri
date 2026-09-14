import {
  getSecurityRuntimeState,
} from "../../../../application/security/runtime/securityRuntimeStore"

export function hasSecuritySession(): boolean {
  return Boolean(
    getSecurityRuntimeState().session.session,
  )
}
