export interface PropertyCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createPropertyCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): PropertyCommandPipeline {
  return {
    execute,
  }
}
