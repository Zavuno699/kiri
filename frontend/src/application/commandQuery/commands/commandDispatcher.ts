import type {
  ApplicationCommand,
} from "./command"

export type CommandExecutor<
  TPayload = unknown,
  TResult = unknown,
> = (
  command: ApplicationCommand<TPayload>,
) => Promise<TResult> | TResult

const executors =
  new Map<string, CommandExecutor<any, any>>()

export function registerCommandExecutor(
  type: string,
  executor: CommandExecutor,
): void {
  executors.set(type, executor)
}

export async function dispatchCommand<
  TPayload = unknown,
  TResult = unknown,
>(
  command: ApplicationCommand<TPayload>,
): Promise<TResult> {
  const executor = executors.get(command.type)

  if (!executor) {
    throw new Error(
      `No command executor registered for ${command.type}`,
    )
  }

  return executor(command) as Promise<TResult>
}
