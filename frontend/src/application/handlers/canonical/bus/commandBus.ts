import type {
  Command,
} from "../contracts/command";

import {
  getCommandHandler,
} from "../registry/commandHandlerRegistry";

export async function dispatchCommand<
  TResult = unknown,
>(
  command: Command,
): Promise<TResult> {
  const handler =
    getCommandHandler(
      command.type,
    );

  if (!handler) {
    throw new Error(
      `No command handler registered for ${command.type}`,
    );
  }

  return (
    await handler.execute(command)
  ) as TResult;
}
