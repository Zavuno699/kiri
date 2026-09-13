export interface SecurityListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createSecurityListHandler(
  query: (params?: unknown) => Promise<unknown>,
): SecurityListHandler {
  return {
    execute: query,
  }
}
