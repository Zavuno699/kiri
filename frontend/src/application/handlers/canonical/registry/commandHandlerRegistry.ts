import type { CommandHandler } from "../contracts/commandHandler"

const registry = new Map<string, CommandHandler>()

export function registerCommandHandler(
  handler: CommandHandler,
): void

export function registerCommandHandler(
  commandType: string,
  handler: CommandHandler,
): void

export function registerCommandHandler(
  first: string | CommandHandler,
  second?: CommandHandler,
): void {
  const handler =
    typeof first === "string" ? second! : first

  const commandType =
    typeof first === "string"
      ? first
      : first.commandType

  registry.set(commandType, handler)
}

export function getCommandHandler(
  commandType: string,
): CommandHandler | undefined {
  return registry.get(commandType)
}

export function listCommandHandlers(): CommandHandler[] {
  return [...registry.values()]
}
