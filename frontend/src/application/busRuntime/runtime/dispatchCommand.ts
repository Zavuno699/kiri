import type {
  Command,
} from "../../handlers/canonical/contracts/command";

import {
  dispatchCommand as dispatchCanonicalCommand,
} from "../../handlers/canonical/bus/commandBus";

import {
  createDispatchContext,
} from "./createDispatchContext";

import {
  authorizeDispatch,
} from "./authorizeDispatch";

import {
  recordCommandAudit,
} from "../../audit/events/recordCommandAudit";

export async function dispatchApplicationCommand<
  TResult = unknown,
>(
  command: Command,
  options?: {
    capability?: string;
  },
): Promise<TResult> {
  const context =
    createDispatchContext();

  authorizeDispatch(
    options?.capability,
  );

  try {
    const result =
      await dispatchCanonicalCommand<TResult>(
        command,
      );

    recordCommandAudit({
      command: command.type,
      outcome: "success",
      principal:
        context.principal,
      sessionId:
        context.sessionId,
      capability:
        options?.capability ?? null,
      correlationId:
        context.correlationId,
      causationId:
        context.causationId,
    });

    return result;
  } catch (error) {
    recordCommandAudit({
      command: command.type,
      outcome: "failed",
      principal:
        context.principal,
      sessionId:
        context.sessionId,
      capability:
        options?.capability ?? null,
      reason:
        error instanceof Error
          ? error.message
          : "command-failed",
      correlationId:
        context.correlationId,
      causationId:
        context.causationId,
    });

    throw error;
  }
}
