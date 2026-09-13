export interface LeaseInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createLeaseInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): LeaseInspectOperation {
  return {
    execute: inspect,
  }
}
