export interface SecurityDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createSecurityDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): SecurityDetailLoader {
  return {
    load,
  }
}
