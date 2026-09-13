import {
  getCommand,
} from "../registry/commandRegistry";

export interface CommandAuthorizationContext {
  authenticated: boolean;
  allowedDomains: string[];
  capabilities: string[];
  confirmed: boolean;
}

export interface CommandAuthorizationResult {
  allowed: boolean;
  reason: string | null;
}

export function authorizeCommand(
  commandId: string,
  context:
    CommandAuthorizationContext,
): CommandAuthorizationResult {
  const command =
    getCommand(
      commandId,
    );

  if (!command) {
    return {
      allowed:
        false,
      reason:
        "Command not registered",
    };
  }

  if (!command.enabled) {
    return {
      allowed:
        false,
      reason:
        "Command disabled",
    };
  }

  if (
    !context.authenticated &&
    command.requiresAuthorization
  ) {
    return {
      allowed:
        false,
      reason:
        "Authentication required",
    };
  }

  if (
    !context.allowedDomains.includes(
      command.domain,
    ) &&
    command.domain !==
      "global"
  ) {
    return {
      allowed:
        false,
      reason:
        "Domain access denied",
    };
  }

  if (
    command.requiresAuthorization &&
    !context.capabilities.includes(
      command.id,
    )
  ) {
    return {
      allowed:
        false,
      reason:
        "Capability denied",
    };
  }

  if (
    command.requiresConfirmation &&
    !context.confirmed
  ) {
    return {
      allowed:
        false,
      reason:
        "Confirmation required",
    };
  }

  return {
    allowed:
      true,
    reason:
      null,
  };
}
