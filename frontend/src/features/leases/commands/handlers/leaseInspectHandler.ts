export interface LeaseInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createLeaseInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): LeaseInspectHandler {
  return {
    execute: inspect,
  }
}
