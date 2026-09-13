import { resetSecurityRuntimeState } from "../securityRuntimeStore"

export function shutdownSecurityRuntimeState() {
  return resetSecurityRuntimeState()
}
