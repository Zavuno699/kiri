export interface SecurityPageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createSecurityPageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): SecurityPageLoader {
  return {
    load,
  }
}
