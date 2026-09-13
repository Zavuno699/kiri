export interface CommandHandler<C = any, R = any> {
  commandType: string
  execute(command: C): Promise<R> | R
}
