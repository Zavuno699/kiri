import type {
  CommandRequest,
} from "../contracts/commandRequest";

import type {
  CommandResult,
} from "../contracts/commandResult";

import {
  authorizeCommand,
} from "../authorization/authorizeCommand";

import {
  setCommandExecutionState,
} from "../state/commandExecutionStore";

import {
  appendCommandHistory,
} from "../events/commandHistoryStore";

export function executeCommand(
  request: CommandRequest,
): CommandResult {
  setCommandExecutionState({
    activeCommandId:
      request.commandId,
    entityId:
      request.entityId,
    status:
      "pending",
    message:
      "Authorizing command",
    correlationId:
      request.correlationId,
    startedAt:
      request.requestedAt,
    completedAt:
      null,
  });

  const authorization =
    authorizeCommand(
      request.commandId,
      {
        authenticated:
          true,
        allowedDomains:
          [request.domain, "global"],
        capabilities:
          [request.commandId],
        confirmed:
          true,
      },
    );

  if (!authorization.allowed) {
    const result: CommandResult = {
      commandId:
        request.commandId,
      accepted:
        false,
      status:
        "blocked",
      message:
        authorization.reason ??
        "Command blocked",
      data:
        null,
      correlationId:
        request.correlationId,
    };

    setCommandExecutionState({
      status:
        "blocked",
      message:
        result.message,
      completedAt:
        new Date().toISOString(),
    });

    appendCommandHistory(
      result,
      request.entityId,
    );

    return result;
  }

  const result: CommandResult = {
    commandId:
      request.commandId,
    accepted:
      true,
    status:
      "accepted",
    message:
      "Command accepted by frontend control plane",
    data:
      null,
    correlationId:
      request.correlationId,
  };

  setCommandExecutionState({
    status:
      "accepted",
    message:
      result.message,
    completedAt:
      new Date().toISOString(),
  });

  appendCommandHistory(
    result,
    request.entityId,
  );

  return result;
}
