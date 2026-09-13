export interface SecurityListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createSecurityListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): SecurityListLoader {
  return {
    load,
  }
}
