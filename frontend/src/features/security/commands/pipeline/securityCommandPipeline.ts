export interface SecurityCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createSecurityCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): SecurityCommandPipeline {
  return {
    execute,
  }
}
