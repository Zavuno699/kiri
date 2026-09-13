export interface Command<TResponse = unknown> {
  type: string
  payload?: unknown
  execute(): Promise<TResponse>
}

export interface CommandHandler<T = unknown> {
  execute(command: Command<T>): Promise<T>
}

export class CommandBus {
  private readonly handlers =
    new Map<string, CommandHandler>()

  register(
    type: string,
    handler: CommandHandler,
  ): void {
    if (this.handlers.has(type)) {
      throw new Error(
        `Command handler already registered: ${type}`,
      )
    }

    this.handlers.set(type, handler)
  }

  async dispatch<T>(
    command: Command<T>,
  ): Promise<T> {
    const handler =
      this.handlers.get(command.type)

    if (!handler) {
      throw new Error(
        `No command handler registered for ${command.type}`,
      )
    }

    return handler.execute(command) as Promise<T>
  }

  has(type: string): boolean {
    return this.handlers.has(type)
  }
}

export const commandBus =
  new CommandBus()
