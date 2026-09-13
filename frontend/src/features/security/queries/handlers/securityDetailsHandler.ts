export interface SecurityDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createSecurityDetailsHandler(
  query: (id: string) => Promise<unknown>,
): SecurityDetailsHandler {
  return {
    execute: query,
  }
}
