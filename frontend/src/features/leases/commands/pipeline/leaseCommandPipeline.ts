export interface LeaseCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createLeaseCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): LeaseCommandPipeline {
  return {
    execute,
  }
}
