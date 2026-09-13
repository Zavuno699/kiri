import {
  setAuthenticationState,
} from "../state/authenticationStore"

export interface AuthenticateCommand {
  principalId: string
  sessionId: string
  tenantId?: string
  capabilities?: string[]
}

export function authenticate(
  command: AuthenticateCommand,
) {
  return setAuthenticationState({
    principalId: command.principalId,
    principal: command.principalId,
    sessionId: command.sessionId,
    tenantId: command.tenantId ?? null,
    capabilities: command.capabilities ?? [],
    authenticated: true,
    status: "authenticated",
  })
}
