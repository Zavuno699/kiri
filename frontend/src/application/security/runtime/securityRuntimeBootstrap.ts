import { setSecurityRuntimeState } from "./securityRuntimeStore"

export function bootstrapSecurityRuntime() {
  return setSecurityRuntimeState({
    session: {
      initialized: true,
      requiresAuthentication: true,
      session: {
        id: crypto.randomUUID(),
      },
    },
    identity: {
      authenticated: true,
      principal: "operator",
      tenantId: "default",
    },
    permissions: ["*"],
    authorizationReady: true,
    frozen: false,
  })
}
