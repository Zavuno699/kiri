export interface LeaseQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createLeaseQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): LeaseQueryController {
  return {
    execute,
  }
}
