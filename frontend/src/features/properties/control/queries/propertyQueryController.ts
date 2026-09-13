export interface PropertyQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createPropertyQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): PropertyQueryController {
  return {
    execute,
  }
}
