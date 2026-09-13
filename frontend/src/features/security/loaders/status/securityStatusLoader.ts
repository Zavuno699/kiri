export interface SecurityStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createSecurityStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): SecurityStatusLoader {
  return {
    load,
  }
}
