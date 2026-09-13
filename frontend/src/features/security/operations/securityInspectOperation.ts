export interface SecurityInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createSecurityInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): SecurityInspectOperation {
  return {
    execute: inspect,
  }
}
