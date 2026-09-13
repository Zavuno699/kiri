import type { SecurityCommandType } from "./securityCommandTypes"

export interface SecurityCommand {
  type: SecurityCommandType
  securityId?: string
}

export function createSecurityCommand(
  type: SecurityCommandType,
  securityId?: string,
): SecurityCommand {
  return {
    type,
    securityId,
  }
}
