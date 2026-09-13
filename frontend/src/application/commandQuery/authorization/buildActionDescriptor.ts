import {
  getCommand,
} from "../registry/commandRegistry";

import type {
  ActionDescriptor,
} from "../contracts/actionDescriptor";

import {
  authorizeCommand,
} from "./authorizeCommand";

export function buildActionDescriptor(
  commandId: string,
  entityId: string | null,
  context: Parameters<
    typeof authorizeCommand
  >[1],
): ActionDescriptor {
  const command =
    getCommand(
      commandId,
    );

  if (!command) {
    return {
      id:
        commandId,
      command: {
        id:
          commandId,
        domain:
          "unknown",
        name:
          commandId,
        label:
          commandId,
        description:
          "Unregistered command",
        risk:
          "critical",
        requiresAuthorization:
          true,
        requiresConfirmation:
          true,
        enabled:
          false,
      },
      entityId,
      visible:
        false,
      enabled:
        false,
      blockedReason:
        "Command not registered",
    };
  }

  const authorization =
    authorizeCommand(
      commandId,
      context,
    );

  return {
    id:
      `${commandId}:${entityId ?? "global"}`,
    command,
    entityId,
    visible:
      true,
    enabled:
      authorization.allowed,
    blockedReason:
      authorization.reason,
  };
}
