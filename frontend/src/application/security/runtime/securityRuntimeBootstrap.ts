import { setSecurityRuntimeState } from "./securityRuntimeStore"

export function bootstrapSecurityRuntime() {
  return setSecurityRuntimeState({
    session: {
      initialized: true,
      requiresAuthentication: true,
      session: null,
    },
    identity: {
      authenticated: false,
      principal: null,
      tenantId: null,
    },
    permissions: null,
    authorizationReady: false,
    frozen: false,
  })
}
