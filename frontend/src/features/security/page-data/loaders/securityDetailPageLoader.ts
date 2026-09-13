export interface SecurityDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createSecurityDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): SecurityDetailPageLoader {
  return {
    load,
  }
}
