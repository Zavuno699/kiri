export interface SecurityQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createSecurityQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): SecurityQueryController {
  return {
    execute,
  }
}
